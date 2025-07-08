import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import Times from '~/components/Times'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { theme } from '~/theme'
import SettingsFAB from './components/SettingsFAB'

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <SafeAreaView style={styles.root}>
            <StatusBar style="auto" />
            <Times />
            <SettingsFAB />
          </SafeAreaView>
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
})
