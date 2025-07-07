import { Platform, Switch as RNSwitch, SwitchProps } from 'react-native'
import { palette } from '../theme/palette'

export function Switch(props: SwitchProps) {
  return (
    <RNSwitch
      trackColor={{
        false: palette.neutral.mid,
        true: Platform.OS === 'web' ? palette.neutral.mid : palette.blue,
      }}
      // thumbColor={!!props.value ? Palette.blue : Palette.text.mid}
      // @ts-expect-error: Prop needed for web...
      activeThumbColor={palette.blue}
      {...props}
    />
  )
}
