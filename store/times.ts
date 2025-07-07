import { create } from 'zustand'
import { GetTimesResult } from 'suncalc'

export interface SunTimesType {
  sunTimes: GetTimesResult | null
  setSunTimes: (sunTimes: SunTimesType['sunTimes']) => void
  tomorrowsTimes: GetTimesResult | null
  setTomorrowsTimes: (tomorrowTimes: SunTimesType['tomorrowsTimes']) => void
}

export const useTimesStore = create<SunTimesType>()((set, get) => ({
  sunTimes: null,
  setSunTimes: (sunTimes) => set({ sunTimes }),
  tomorrowsTimes: null,
  setTomorrowsTimes: (tomorrowsTimes) => set({ tomorrowsTimes }),
}))
