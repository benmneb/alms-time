import { StatusBar } from 'expo-status-bar'
import { Pressable, Text, StyleSheet } from 'react-native'
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
      <Pressable
        style={[
          styles.fab,
          {
            right: 24 + insets.right,
            bottom: 36 + insets.bottom,
          },
        ]}
        onPress={handleSettingsPress}
      >
        <Text style={{ fontSize: 42 }}>⚙️</Text>
      </Pressable>
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
    backgroundColor: '#faf6e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    // backgroundColor: '#333',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
