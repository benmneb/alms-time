import { GetTimesResult } from 'suncalc'
import { SettingsType } from '../store/settings'

/**
 * Mapping from user-friendly dawn type settings to corresponding SunCalc time property names.
 *
 * - 'astro': Astronomical dawn (sun is 18° below horizon)
 * - 'nautical': Nautical dawn (sun is 12° below horizon)
 * - 'civil': Civil dawn (sun is 6° below horizon)
 */
const DAWN_TYPE_TO_SUNCALC_KEY: Record<
  SettingsType['dawnType'],
  keyof GetTimesResult
> = {
  astro: 'nightEnd',
  nautical: 'nauticalDawn',
  civil: 'dawn',
} as const

/**
 * Maps dawn type names used in local state to the specific property names
 * used in the SunCalc library's GetTimesResult object.
 *
 * @param dawnType - The dawn type from user settings state
 * @returns The corresponding property name from SunCalc's GetTimesResult object
 */
export function getSunCalcDawnKey(
  dawnType: SettingsType['dawnType']
): keyof GetTimesResult {
  return DAWN_TYPE_TO_SUNCALC_KEY[dawnType]
}
