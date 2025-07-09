import SunCalc from 'suncalc'
import { SettingsType } from '~/store/settings'

type SunTimes = ReturnType<typeof SunCalc.getTimes>

const dawnEvents = [
  'nightEnd',
  'nauticalDawn',
  'dawn',
  'sunrise',
  'sunriseEnd',
  'goldenHourEnd',
] as const

const noonEvents = ['solarNoon', 'goldenHour', 'sunsetStart'] as const

const duskEvents = ['sunset', 'dusk', 'nauticalDusk'] as const

const nightEvents = ['night', 'nadir'] as const

type EventCategory = 'dawn' | 'noon' | 'dusk' | 'night'

const eventCategoryMap: Record<string, EventCategory | undefined> =
  Object.fromEntries([
    ...dawnEvents.map((e) => [e, 'dawn']),
    ...noonEvents.map((e) => [e, 'noon']),
    ...duskEvents.map((e) => [e, 'dusk']),
    ...nightEvents.map((e) => [e, 'night']),
  ])

/**
 * Applies the user selected time offset setting (in minutes)
 * to all Date fields in the sun times object.
 *
 * Adds the offset to dawn times, and subtracts offset from noon.
 * Leaves all other times unchanged.
 */
export function applyTimeOffset(
  times: SunTimes,
  offsetMinutes: SettingsType['timeOffset']
): SunTimes {
  const offsetMs = offsetMinutes * 60 * 1000

  const adjustedEntries = Object.entries(times).map(([key, value]) => {
    const category = eventCategoryMap[key]
    if (!(value instanceof Date)) return [key, value]

    if (category === 'dawn') {
      return [key, new Date(value.getTime() + offsetMs)]
    } else if (category === 'noon') {
      return [key, new Date(value.getTime() - offsetMs)]
    } else {
      return [key, value] // dusk and night unchanged
    }
  })

  return Object.fromEntries(adjustedEntries) as SunTimes
}
