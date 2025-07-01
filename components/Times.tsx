import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  LogBox,
  Platform,
} from 'react-native'
import * as Location from 'expo-location'
import SunCalc, { GetTimesResult } from 'suncalc'

type WebGeocodeReturnType = { display_name: string }

type ReverseGeocodeReturnType =
  | Location.LocationGeocodedAddress
  | WebGeocodeReturnType

async function reverseWebGeocodeAsync(
  lat: Location.LocationObjectCoords['latitude'],
  lon: Location.LocationObjectCoords['longitude']
): Promise<WebGeocodeReturnType> {
  // Docs: https://nominatim.org/release-docs/develop/api/Reverse/
  // License: http://osm.org/copyright
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
  )
  const { display_name } = await res.json()
  return { display_name }
}

export default function Times() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null)
  const [address, setAddress] = useState<ReverseGeocodeReturnType | null>(null)
  const [sunTimes, setSunTimes] = useState<GetTimesResult | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          // TODO: web alerts component
          Alert.alert('Permission Denied', 'Location permission is required.')
          setLoading(false)
          return
        }

        // Get current location coordinates
        const loc = await Location.getCurrentPositionAsync({})
        setLocation(loc.coords)

        // Get human-readable address
        if (Platform.OS === 'web') {
          if (loc.coords) {
            const geo = await reverseWebGeocodeAsync(
              loc.coords.latitude,
              loc.coords.longitude
            )
            setAddress(geo)
          } else {
            console.error('No location coords')
          }
        } else {
          const geo = await Location.reverseGeocodeAsync(loc.coords)
          if (geo.length > 0) {
            setAddress(geo[0])
          }
        }

        // Calculate sun times
        const now = new Date()
        const times = SunCalc.getTimes(
          now,
          loc.coords.latitude,
          loc.coords.longitude
        )
        setSunTimes(times)
      } catch (error) {
        console.error('Error fetching location or sun data:', error)
        // TODO: web alert component
        Alert.alert('Error', 'Could not retrieve sun or location data.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />

  if (!location) return <Text>Could not get location.</Text>
  if (!sunTimes) return <Text>Could not calculate sun times.</Text>

  return (
    <View style={{ padding: 20 }}>
      <Text>Dawnrise: {sunTimes.nauticalDawn.toLocaleTimeString()}</Text>
      <Text style={{ marginBottom: 10 }}>
        Solar Noon: {sunTimes.solarNoon.toLocaleTimeString()}
      </Text>
      <Text>
        📍 Location:{' '}
        {(address && 'display_name' in address
          ? address?.display_name
          : address?.city || address?.region) || 'Unknown'}
      </Text>
    </View>
  )
}
