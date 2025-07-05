import { Platform } from 'react-native'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

function getPersistentStorage() {
  if (Platform.OS === 'web') {
    const { get, set, del } = require('idb-keyval')
    return {
      getItem: (name: string) => get(name),
      setItem: (name: string, value: string) => set(name, value),
      removeItem: (name: string) => del(name),
    }
  } else {
    const AsyncStorage =
      require('@react-native-async-storage/async-storage').default
    return {
      getItem: (name: string) => AsyncStorage.getItem(name),
      setItem: (name: string, value: string) =>
        AsyncStorage.setItem(name, value),
      removeItem: (name: string) => AsyncStorage.removeItem(name),
    }
  }
}

export type DawnTypes = 'astro' | 'nautical' | 'civil'

interface State {
  dawnTime: DawnTypes
  setDawnTime: (dawnTime: State['dawnTime']) => void
  timeFormat: 'absolute' | 'relative'
  setTimeFormat: (timeFormat: State['timeFormat']) => void
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      dawnTime: 'nautical',
      setDawnTime: (dawnTime) => set({ dawnTime }),
      timeFormat: 'absolute',
      setTimeFormat: (timeFormat) => set({ timeFormat }),
    }),
    {
      name: 'alms-time-storage',
      storage: createJSONStorage(getPersistentStorage),
    }
  )
)
