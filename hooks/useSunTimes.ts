import { useCallback, useEffect } from 'react'
import { Platform } from 'react-native'
import * as Location from 'expo-location'
import SunCalc from 'suncalc'
import { useLocationStore, useTimesStore } from '../store'
import {
  reverseWebGeocodeAsync,
  WebGeocodeReturnType,
} from '../helpers/reverseWebGeocodeAsync'

export function useSunTimes() {
  const setLoading = useLocationStore((s) => s.setLoading)
  const setLocation = useLocationStore((s) => s.setLocation)
  const setAddress = useLocationStore((s) => s.setAddress)
  const setSunTimes = useTimesStore((s) => s.setSunTimes)

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
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          alert('Geolocation is not supported by your browser.')
          reject('Geolocation is not supported by the browser.')
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve(position.coords)
            },
            (error) => {
              console.error(error)
              reject(error.message)
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
        try {
          const geo = await Location.reverseGeocodeAsync(coords)
          if (!cancelled) setAddress(geo.length > 0 ? geo[0] : null)
        } catch (error) {
          console.error(error)
        }
      }

      // Calculate sun times
      const now = new Date()
      const times = SunCalc.getTimes(now, coords.latitude, coords.longitude)
      if (!cancelled) setSunTimes(times)
    } catch (error) {
      console.error('Getting sunTimes:', error)
    } finally {
      if (!cancelled) setLoading(false)
    }

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (Platform.OS === 'web') return // Ask after user interaction: https://web.dev/articles/permissions-best-practices
    fetchLocationAndSunTimes()
  }, [])

  return {
    refetch: fetchLocationAndSunTimes,
  }
}
