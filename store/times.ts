import { create } from 'zustand'
import { GetTimesResult } from 'suncalc'

export interface SunTimesType {
  sunTimes: GetTimesResult | null
  setSunTimes: (sunTimes: SunTimesType['sunTimes']) => void
}

export const useTimesStore = create<SunTimesType>()((set, get) => ({
  sunTimes: null,
  setSunTimes: (sunTimes) => set({ sunTimes }),
}))
