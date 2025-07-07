import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import Times from './components/Times'
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useCallback, useRef } from 'react'
import SettingsSheet from './components/SettingsSheet'
import IconButton from './components/IconButton'
import { SettingsIcon } from './components/icons/Settings'
import { theme } from './theme'

function Content() {
  const insets = useSafeAreaInsets()
  const settingsSheetRef = useRef<BottomSheetModal>(null)

  const handleSettingsPress = useCallback(() => {
    settingsSheetRef.current?.present()
  }, [])

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="auto" />
      <Times />
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
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Content />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
