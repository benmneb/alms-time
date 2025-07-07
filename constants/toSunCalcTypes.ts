import { GetTimesResult } from 'suncalc'
import { SettingsType } from '../store/settings'

/**
 * To convert SunCalc keys into better names used in `dawnType` state.
 */
export const toSunCalcTypes: Record<
  SettingsType['dawnType'],
  keyof GetTimesResult
> = {
  astro: 'nightEnd',
  nautical: 'nauticalDawn',
  civil: 'dawn',
}
