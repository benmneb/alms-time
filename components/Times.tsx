import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import NoLocation from './NoLocation'
import NoSunTimes from './NoSunTimes'
import { useSunTimes } from '../hooks/useSunTimes'

export default function Times() {
  const { loading, location, sunTimes, addressString, refetch } = useSunTimes()

  if (loading) return <ActivityIndicator size="large" style={styles.loading} />

  if (!location) return <NoLocation refetch={refetch} />
  if (!sunTimes) return <NoSunTimes refetch={refetch} />

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dawnrise</Text>
      <Text style={styles.dawnRise}>
        {sunTimes.nauticalDawn.toLocaleTimeString()}
      </Text>
      <Text style={styles.label}>Solar Noon</Text>
      <Text style={styles.solarNoon}>
        {sunTimes.solarNoon.toLocaleTimeString()}
      </Text>
      <Text style={styles.address}>📍 {addressString}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 50,
  },
  container: {
    padding: 24,
  },
  label: {
    fontSize: 28,
  },
  dawnRise: {
    marginBottom: 8,
    fontSize: 52,
    fontWeight: 'bold',
  },
  solarNoon: {
    marginBottom: 12,
    fontSize: 52,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 18,
  },
})
