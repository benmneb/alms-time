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
import { theme } from '../theme'

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
    backgroundColor: theme.palette.blue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  outline: {
    borderWidth: 2,
    borderColor: theme.palette.blue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.3,
    borderWidth: 2,
    borderColor: theme.palette.text.muted,
    backgroundColor: 'transparent',
    backfaceVisibility: 'hidden',
  },
  ['disabled-title']: {
    color: theme.palette.text.muted,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ['solid-title']: {
    color: theme.palette.background,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ['outline-title']: {
    color: theme.palette.blue,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
