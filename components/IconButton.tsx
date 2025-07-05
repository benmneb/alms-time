import { Text, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { usePressScale } from '../hooks/usePressScale'
import Animated from 'react-native-reanimated'
import { PropsWithChildren } from 'react'

interface Props {
  icon?: React.ReactNode
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function IconButton({
  icon,
  children,
  onPress,
  style,
}: PropsWithChildren<Props>) {
  const { animatedStyle, onPressIn, onPressOut } = usePressScale()

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={[animatedStyle, style]}
    >
      {icon || children}
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({})
