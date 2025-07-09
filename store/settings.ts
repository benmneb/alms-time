import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getPersistentStorage } from '~/helpers/getPersistentStorage'

export interface SettingsType {
  dawnType: 'astro' | 'nautical' | 'civil'
  setDawnType: (dawnType: SettingsType['dawnType']) => void
  timeOffset: number
  setTimeOffset: (timeOffset: number) => void
  isUsingTimeOffset: boolean
  setIsUsingTimeOffset: (isUsingTimeOffset: boolean) => void
  timeFormat: 'absolute' | 'relative'
  setTimeFormat: (timeFormat: SettingsType['timeFormat']) => void
  locationFormat: 'address' | 'coords'
  setLocationFormat: (locationFormat: SettingsType['locationFormat']) => void
  showLocation: boolean
  setShowLocation: (showLocation: boolean) => void
  onlyShowNextTime: boolean
  setOnlyShowNextTime: (onlyShowNextTime: boolean) => void
}

export const useSettingsStore = create<SettingsType>()(
  persist(
    (set, get) => ({
      dawnType: 'nautical',
      setDawnType: (dawnType) => set({ dawnType }),
      timeOffset: 3,
      setTimeOffset: (timeOffset) => set({ timeOffset }),
      isUsingTimeOffset: false,
      setIsUsingTimeOffset: (isUsingTimeOffset) => set({ isUsingTimeOffset }),
      timeFormat: 'absolute',
      setTimeFormat: (timeFormat) => set({ timeFormat }),
      locationFormat: 'address',
      setLocationFormat: (locationFormat) => set({ locationFormat }),
      showLocation: true,
      setShowLocation: (showLocation) => set({ showLocation }),
      onlyShowNextTime: false,
      setOnlyShowNextTime: (onlyShowNextTime) => set({ onlyShowNextTime }),
    }),
    {
      name: 'alms-time-settings',
      storage: createJSONStorage(getPersistentStorage),
    }
  )
)
