import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useSunTimes } from '../hooks/useSunTimes'

export default function Times() {
  const { loading, location, sunTimes, addressString } = useSunTimes()

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
      <Text>📍 {addressString}</Text>
    </View>
  )
}
