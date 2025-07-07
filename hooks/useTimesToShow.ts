import { toSunCalcTypes } from '../constants/toSunCalcTypes'
import { useSettingsStore } from '../store/settings'
import { useTimesStore } from '../store/times'

/**
 * Determines which times to show based on the `onlyShowNextTime` state setting.
 */
export function useTimesToShow(): {
  showDawn: boolean
  showNoon: boolean
  showTomorrowDawn: boolean
} {
  const onlyShowNextTime = useSettingsStore((s) => s.onlyShowNextTime)
  const sunTimes = useTimesStore((s) => s.sunTimes)
  const dawnType = useSettingsStore((s) => s.dawnType)
  const sunCalcDawnKey = toSunCalcTypes[dawnType]

  let showDawn = true
  let showNoon = true
  let showTomorrowDawn = false

  if (!onlyShowNextTime || !sunTimes)
    return { showDawn, showNoon, showTomorrowDawn }

  const now = new Date()
  const beforeDawn = sunTimes[sunCalcDawnKey].getTime() > now.getTime()
  const beforeNoon = sunTimes.solarNoon.getTime() > now.getTime()

  showDawn = beforeDawn
  showNoon = !beforeDawn && beforeNoon
  showTomorrowDawn = !beforeDawn && !beforeNoon

  return { showDawn, showNoon, showTomorrowDawn }
}
