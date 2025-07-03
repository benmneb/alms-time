import { View, Text, StyleSheet, Platform } from 'react-native'
import Button from './Button'

interface Props {
  refetch: () => Promise<(() => void) | undefined>
}

export default function NoLocation({ refetch }: Props) {
  if (Platform.OS === 'web')
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          <span
            style={{ cursor: 'help' }}
            title="Your location is required to provide accurate dawn rise and solar noon times. Most browsers do not allow geolocation requests without user interaction."
          >
            Location permission is required
          </span>
        </Text>
        <Button
          title="Allow location"
          onPress={() => refetch()}
          style={styles.button}
        />
      </View>
    )

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Could not get location</Text>
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
