import { Text, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { usePressScale } from '../hooks/usePressScale'
import Animated from 'react-native-reanimated'

interface Props {
  title: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  variant?: 'solid' | 'outline'
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Button({
  title,
  onPress,
  style,
  variant = 'solid',
}: Props) {
  const { animatedStyle, onPressIn, onPressOut } = usePressScale()

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={[animatedStyle, styles[variant], style]}
    >
      <Text style={styles[`${variant}-title`]}>{title}</Text>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  solid: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  outline: {
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ['solid-title']: {
    color: '#FFFFFF', // TODO
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ['outline-title']: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
