import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useCallback, useRef } from 'react'
import SettingsSheet from '~/components/SettingsSheet'
import IconButton from '~/components/IconButton'
import { SettingsIcon } from '~/components/icons/Settings'
import { useLocationStore } from '~/store/location'
import { useTimesStore } from '~/store/times'

export default function SettingsFAB() {
  const insets = useSafeAreaInsets()
  const loading = useLocationStore((s) => s.loading)
  const location = useLocationStore((s) => s.coords)
  const sunTimes = useTimesStore((s) => s.sunTimes)
  const settingsSheetRef = useRef<BottomSheetModal>(null)
  const handleSettingsPress = useCallback(() => {
    settingsSheetRef.current?.present()
  }, [])

  if (loading || !location || !sunTimes) return null

  return (
    <>
      <IconButton
        style={[
          styles.fab,
          {
            right: 24 + insets.right,
            bottom: 24 + insets.bottom,
          },
        ]}
        onPress={handleSettingsPress}
      >
        <SettingsIcon />
      </IconButton>
      <SettingsSheet ref={settingsSheetRef} />
    </>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
