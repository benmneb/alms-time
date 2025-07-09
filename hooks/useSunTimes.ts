import { useCallback, useEffect } from 'react'
import { Platform } from 'react-native'
import * as Location from 'expo-location'
import SunCalc from 'suncalc'
import { reverseWebGeocodeAsync } from '~/helpers/reverseWebGeocodeAsync'
import { LocationType, useLocationStore } from '~/store/location'
import { useTimesStore } from '~/store/times'
import { useSettingsStore } from '~/store/settings'
import { applyTimeOffset } from '~/helpers/applyTimeOffset'

export function useSunTimes() {
  const loading = useLocationStore((s) => s.loading)
  const setLoading = useLocationStore((s) => s.setLoading)
  const coords = useLocationStore((s) => s.coords)
  const setCoords = useLocationStore((s) => s.setCoords)
  const setAddress = useLocationStore((s) => s.setAddress)
  const setSunTimes = useTimesStore((s) => s.setSunTimes)
  const setTomorrowsTimes = useTimesStore((s) => s.setTomorrowsTimes)
  const timeOffset = useSettingsStore((s) => s.timeOffset)
  const isUsingTimeOffset = useSettingsStore((s) => s.isUsingTimeOffset)

  const calculateSunTimes = useCallback(
    (coords: LocationType['coords']) => {
      if (!coords?.latitude || !coords.longitude) return

      const today = new Date()
      const tomorrow = new Date(new Date().setDate(today.getDate() + 1))
      const todaysTimes = applyTimeOffset(
        SunCalc.getTimes(today, coords.latitude, coords.longitude),
        isUsingTimeOffset ? timeOffset : 0
      )
      const tomorrowsTimes = applyTimeOffset(
        SunCalc.getTimes(tomorrow, coords.latitude, coords.longitude),
        isUsingTimeOffset ? timeOffset : 0
      )
      setSunTimes(todaysTimes)
      setTomorrowsTimes(tomorrowsTimes)
    },
    [coords?.latitude, coords?.longitude, timeOffset, isUsingTimeOffset]
  )

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
      setCoords(coords)

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

      if (!cancelled) calculateSunTimes(coords)
    } catch (error) {
      console.error('fetchLocationAndSunTimes:', error)
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

  useEffect(() => {
    if (loading) return
    calculateSunTimes(coords)
  }, [timeOffset, isUsingTimeOffset])

  return {
    refetch: fetchLocationAndSunTimes,
  }
}
