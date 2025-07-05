import { Platform } from 'react-native'

export function getPersistentStorage() {
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
