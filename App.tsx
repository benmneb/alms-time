import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Times from './components/Times'

export default function App() {
  return (
    <View style={styles.root}>
      <Times />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#faf6e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
