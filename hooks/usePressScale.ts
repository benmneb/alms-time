import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { useCallback } from 'react'

export function usePressScale(scaleTo: number = 0.96, duration: number = 100) {
  const scale = useSharedValue(1)

  const onPressIn = useCallback(() => {
    scale.value = withTiming(scaleTo, { duration })
  }, [scale, scaleTo, duration])

  const onPressOut = useCallback(() => {
    scale.value = withTiming(1, { duration })
  }, [scale, duration])

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
    }),
    [scale]
  )

  return { animatedStyle, onPressIn, onPressOut }
}
