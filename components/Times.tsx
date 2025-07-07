import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import NoLocation from './NoLocation'
import NoSunTimes from './NoSunTimes'
import { GetTimesResult } from 'suncalc'
import { useSunTimes } from '../hooks/useSunTimes'
import { useLocationStore, useSettingsStore, useTimesStore } from '../store'
import { formatRoundedTime } from '../helpers/formatRoundedTime'
import { useRelativeTime } from '../hooks/useRelativeTime'
import { SettingsType } from '../store/settings'

const toSunCalcTypes: Partial<
  Record<SettingsType['dawnType'], keyof GetTimesResult>
> = {
  astro: 'nightEnd',
  nautical: 'nauticalDawn',
  civil: 'dawn',
}

export default function Times() {
  const { refetch } = useSunTimes()
  const loading = useLocationStore((s) => s.loading)
  const location = useLocationStore((s) => s.coords)
  const formattedAddress = useLocationStore((s) => s.formattedAddress)
  const sunTimes = useTimesStore((s) => s.sunTimes)
  const dawnType = useSettingsStore((s) => s.dawnType)
  const timeFormat = useSettingsStore((s) => s.timeFormat)
  const setTimeFormat = useSettingsStore((s) => s.setTimeFormat)
  const locationFormat = useSettingsStore((s) => s.locationFormat)
  const setLocationFormat = useSettingsStore((s) => s.setLocationFormat)
  const showLocation = useSettingsStore((s) => s.showLocation)

  const sunCalcKey = toSunCalcTypes?.[dawnType]
  const dawnRelative = useRelativeTime(sunTimes?.[sunCalcKey!])
  const noonRelative = useRelativeTime(sunTimes?.solarNoon)

  if (loading) return <ActivityIndicator size="large" style={styles.loading} />

  if (!location) return <NoLocation refetch={refetch} />
  if (!sunTimes || !sunCalcKey) return <NoSunTimes refetch={refetch} />

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dawn</Text>
      <Text
        style={styles.dawnRise}
        onPress={() =>
          setTimeFormat(timeFormat === 'absolute' ? 'relative' : 'absolute')
        }
      >
        {timeFormat === 'absolute'
          ? formatRoundedTime(sunTimes[sunCalcKey], 'up')
          : dawnRelative}
      </Text>
      <Text style={styles.label}>Solar Noon</Text>
      <Text
        style={styles.solarNoon}
        onPress={() =>
          setTimeFormat(timeFormat === 'absolute' ? 'relative' : 'absolute')
        }
      >
        {timeFormat === 'absolute'
          ? formatRoundedTime(sunTimes.solarNoon, 'down')
          : noonRelative}
      </Text>
      {showLocation && (
        <Text style={styles.address}>
          📍{' '}
          <Text
            disabled={!formattedAddress}
            onPress={() =>
              setLocationFormat(
                locationFormat === 'address' ? 'coords' : 'address'
              )
            }
          >
            {formattedAddress && locationFormat === 'address'
              ? formattedAddress
              : `${location.latitude}, ${location.longitude}`}
          </Text>
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 50,
  },
  container: {
    padding: 24,
    // TODO: left align on mobile
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
