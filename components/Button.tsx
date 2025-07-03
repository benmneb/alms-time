import { Text, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { usePressScale } from '../hooks/usePressScale'
import Animated from 'react-native-reanimated'

interface Props {
  title: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Button({ title, onPress, style }: Props) {
  const { animatedStyle, onPressIn, onPressOut } = usePressScale()

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={[animatedStyle, styles.button, style]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF', // TODO
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
