import { Platform, Switch as RNSwitch, SwitchProps } from 'react-native'
import { theme } from '../theme'

export function Switch(props: SwitchProps) {
  return (
    <RNSwitch
      trackColor={{
        false: theme.palette.neutral.mid,
        true:
          Platform.OS === 'web'
            ? theme.palette.neutral.mid
            : theme.palette.blue,
      }}
      // thumbColor={!!props.value ? Palette.blue : Palette.text.mid}
      // @ts-expect-error: Prop needed for web...
      activeThumbColor={theme.palette.blue}
      {...props}
    />
  )
}
