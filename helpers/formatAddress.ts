import * as Location from 'expo-location'
import { WebGeocodeReturnType } from './reverseWebGeocodeAsync'

export type ReverseGeocodeReturnType =
  | Location.LocationGeocodedAddress
  | WebGeocodeReturnType

export function formatAddress(
  address: ReverseGeocodeReturnType | null
): string | null {
  if (!address) return null
  if ('display_name' in address) return address.display_name // Came from web
  return (
    address.city ||
    address.region ||
    address.name ||
    address.district ||
    address.subregion ||
    address.country ||
    null
  )
}
