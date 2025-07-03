import { View, Text, StyleSheet, Platform } from 'react-native'
import Button from './Button'

interface Props {
  refetch: () => Promise<(() => void) | undefined>
}

export default function NoLocation({ refetch }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Could not calculate times</Text>
      <Button
        title="Try again"
        onPress={() => refetch()}
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
})
