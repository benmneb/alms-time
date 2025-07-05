import { create } from 'zustand'
import * as Location from 'expo-location'
import { Platform } from 'react-native'
import {
  formatAddress,
  ReverseGeocodeReturnType,
} from '../helpers/formatAddress'

export interface LocationType {
  loading: boolean | null
  setLoading: (loading: LocationType['loading']) => void
  location: Location.LocationObjectCoords | null
  setLocation: (location: LocationType['location']) => void
  address: ReverseGeocodeReturnType | null
  setAddress: (address: LocationType['address']) => void
  addressString: ReturnType<typeof formatAddress>
}

export const useLocationStore = create<LocationType>()((set, get) => ({
  loading: Platform.OS !== 'web',
  setLoading: (loading) => set({ loading }),
  location: null, // TODO: rename to coords
  setLocation: (location) => set({ location }),
  address: null,
  setAddress: (address) =>
    set({ address, addressString: formatAddress(address) }),
  addressString: null,
}))
