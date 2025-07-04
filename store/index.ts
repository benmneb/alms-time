import { create } from 'zustand'

export type DawnTypes = 'astro' | 'nautical' | 'civil'

interface State {
  dawnTime: DawnTypes
  setDawnTime: (dawnTime: State['dawnTime']) => void
}

export const useStore = create<State>()((set) => ({
  dawnTime: 'nautical',
  setDawnTime: (dawnTime) => set({ dawnTime }),
}))
