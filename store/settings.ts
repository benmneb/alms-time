import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getPersistentStorage } from '../helpers/getPersistentStorage'

export interface SettingsType {
  dawnTime: 'astro' | 'nautical' | 'civil'
  setDawnTime: (dawnTime: SettingsType['dawnTime']) => void
  timeFormat: 'absolute' | 'relative'
  setTimeFormat: (timeFormat: SettingsType['timeFormat']) => void
  locationFormat: 'address' | 'coords'
  setLocationFormat: (locationFormat: SettingsType['locationFormat']) => void
}

export const useSettingsStore = create<SettingsType>()(
  persist(
    (set, get) => ({
      dawnTime: 'nautical', // TODO: rename
      setDawnTime: (dawnTime) => set({ dawnTime }),
      timeFormat: 'absolute',
      setTimeFormat: (timeFormat) => set({ timeFormat }),
      locationFormat: 'address',
      setLocationFormat: (locationFormat) => set({ locationFormat }),
    }),
    {
      name: 'alms-time-settings',
      storage: createJSONStorage(getPersistentStorage),
    }
  )
)
