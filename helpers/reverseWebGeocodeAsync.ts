import * as Location from 'expo-location'

export type WebGeocodeReturnType = { display_name: string | null }

export async function reverseWebGeocodeAsync(
  lat: number,
  lon: number
): Promise<WebGeocodeReturnType> {
  // Docs: https://nominatim.org/release-docs/develop/api/Reverse/
  // License: http://osm.org/copyright
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    )
    const { display_name } = await res.json()
    return { display_name }
  } catch (e) {
    console.error(e)
    return { display_name: null }
  }
}
