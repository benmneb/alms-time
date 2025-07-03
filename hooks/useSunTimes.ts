import { useCallback, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import * as Location from 'expo-location'
import SunCalc, { GetTimesResult } from 'suncalc'

type WebGeocodeReturnType = { display_name: string }
type ReverseGeocodeReturnType =
  | Location.LocationGeocodedAddress
  | WebGeocodeReturnType

async function reverseWebGeocodeAsync(
  lat: number,
  lon: number
): Promise<WebGeocodeReturnType> {
  // Docs: https://nominatim.org/release-docs/develop/api/Reverse/
  // License: http://osm.org/copyright
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    )
    const { display_name } = await res.json()
    return { display_name }
  } catch (e) {
    console.error(e)
    return { display_name: 'Unknown location' }
  }
}

function formatAddress(address: ReverseGeocodeReturnType | null): string {
  if (!address) return 'Unknown location'
  if ('display_name' in address) return address.display_name // Came from web
  return (
    address.city ||
    address.region ||
    address.name ||
    address.district ||
    address.subregion ||
    address.country ||
    'Unknown location'
  )
}

export function useSunTimes() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null)
  const [address, setAddress] = useState<ReverseGeocodeReturnType | null>(null)
  const [sunTimes, setSunTimes] = useState<GetTimesResult | null>(null)
  const [loading, setLoading] = useState<boolean>(Platform.OS !== 'web')

  const fetchLocationAndSunTimes = useCallback(async () => {
    let cancelled = false
    setLoading(true)
    let coords: Location.LocationObjectCoords | null = null

    async function getNativeLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') return null
      const loc = await Location.getCurrentPositionAsync({})
      return loc.coords
    }

    function getWebLocation(): Promise<GeolocationCoordinates | null> {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          alert('Geolocation is not supported by your browser.')
          resolve(null)
        } else {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            () => {
              resolve(null)
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0, // TODO: Cache?
            }
          )
        }
      })
    }

    try {
      if (Platform.OS === 'web') {
        const webCoords = await getWebLocation()
        if (webCoords) {
          coords = {
            latitude: webCoords.latitude,
            longitude: webCoords.longitude,
            altitude: webCoords.altitude ?? 0,
            accuracy: webCoords.accuracy ?? 0,
            altitudeAccuracy: webCoords.altitudeAccuracy ?? null,
            heading: webCoords.heading ?? null,
            speed: webCoords.speed ?? null,
          }
        }
      } else {
        coords = await getNativeLocation()
      }

      if (!coords || cancelled) return
      setLocation(coords)

      // Get human-readable address
      if (Platform.OS === 'web') {
        const geo = await reverseWebGeocodeAsync(
          coords.latitude,
          coords.longitude
        )
        if (!cancelled) setAddress(geo)
      } else {
        const geo = await Location.reverseGeocodeAsync(coords)
        if (!cancelled) setAddress(geo.length > 0 ? geo[0] : null)
      }

      // Calculate sun times
      const now = new Date()
      const times = SunCalc.getTimes(now, coords.latitude, coords.longitude)
      if (!cancelled) setSunTimes(times)
    } catch (error) {
      console.error('Could not retrieve sun or location data:', error)
    } finally {
      if (!cancelled) setLoading(false)
    }

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (Platform.OS === 'web') return
    fetchLocationAndSunTimes()
  }, [])

  return {
    loading,
    location,
    sunTimes,
    address,
    addressString: formatAddress(address),
    refetch: fetchLocationAndSunTimes,
  }
}
