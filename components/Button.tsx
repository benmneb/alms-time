import {
  Text,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
  PressableProps,
} from 'react-native'
import { usePressScale } from '../hooks/usePressScale'
import Animated from 'react-native-reanimated'

interface Props extends PressableProps {
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
  ...props
}: Props) {
  const { animatedStyle, onPressIn, onPressOut } = usePressScale()

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={[
        animatedStyle,
        styles[variant],
        props.disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      <Text
        style={[
          styles[`${variant}-title`],
          props.disabled && styles['disabled-title'],
        ]}
      >
        {title}
      </Text>
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
  disabled: {
    opacity: 0.3,
    borderWidth: 2,
    borderColor: 'grey', // TODO
    backgroundColor: 'transparent',
    backfaceVisibility: 'hidden',
  },
  ['disabled-title']: {
    color: 'grey', // TODO
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
