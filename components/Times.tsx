import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import NoLocation from './NoLocation'
import NoSunTimes from './NoSunTimes'
import { useSunTimes } from '~/hooks/useSunTimes'
import { formatRoundedTime } from '~/helpers/formatRoundedTime'
import { useRelativeTime } from '~/hooks/useRelativeTime'
import { useTimesToShow } from '~/hooks/useTimesToShow'
import { useLocationStore } from '~/store/location'
import { useTimesStore } from '~/store/times'
import { useSettingsStore } from '~/store/settings'
import { getSunCalcDawnKey } from '~/helpers/getSunCalcDawnKey'
import { theme } from '~/theme'

export default function Times() {
  const { refetch } = useSunTimes()
  const loading = useLocationStore((s) => s.loading)
  const location = useLocationStore((s) => s.coords)
  const formattedAddress = useLocationStore((s) => s.formattedAddress)
  const todaysTimes = useTimesStore((s) => s.sunTimes)
  const tomorrowsTimes = useTimesStore((s) => s.tomorrowsTimes)
  const dawnType = useSettingsStore((s) => s.dawnType)
  const timeFormat = useSettingsStore((s) => s.timeFormat)
  const setTimeFormat = useSettingsStore((s) => s.setTimeFormat)
  const locationFormat = useSettingsStore((s) => s.locationFormat)
  const setLocationFormat = useSettingsStore((s) => s.setLocationFormat)
  const showLocation = useSettingsStore((s) => s.showLocation)
  const { showDawn, showNoon, showTomorrowDawn } = useTimesToShow()
  const sunTimes = showTomorrowDawn ? tomorrowsTimes : todaysTimes
  const dawnRelative = useRelativeTime(sunTimes?.[getSunCalcDawnKey(dawnType)])
  const noonRelative = useRelativeTime(sunTimes?.solarNoon)
  const isUsingTimeOffset = useSettingsStore((s) => s.isUsingTimeOffset)
  const timeOffset = useSettingsStore((s) => s.timeOffset)

  if (loading) return <ActivityIndicator size="large" style={styles.loading} />

  if (!location) return <NoLocation refetch={refetch} />
  if (!sunTimes) return <NoSunTimes refetch={refetch} />

  return (
    <View style={styles.container}>
      {(showDawn || showTomorrowDawn) && (
        <>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Dawn</Text>
            {isUsingTimeOffset && (
              <Text style={styles.offsetIndicator}>+{timeOffset}m</Text>
            )}
          </View>
          <Text
            style={styles.dawnRise}
            onPress={() =>
              setTimeFormat(timeFormat === 'absolute' ? 'relative' : 'absolute')
            }
          >
            {timeFormat === 'absolute'
              ? formatRoundedTime(sunTimes[getSunCalcDawnKey(dawnType)], 'up')
              : dawnRelative}
          </Text>
        </>
      )}
      {showNoon && (
        <>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Solar Noon</Text>
            {isUsingTimeOffset && (
              <Text style={styles.offsetIndicator}>-{timeOffset}m</Text>
            )}
          </View>
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
        </>
      )}
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
    color: theme.palette.blue,
  },
  container: {
    padding: 24,
    width: '100%',
    maxWidth: theme.breakpoints.sm,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    color: theme.palette.text.muted,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  offsetIndicator: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.palette.neutral.mid,
    opacity: 0.7,
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
