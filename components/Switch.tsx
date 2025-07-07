import { Switch as RNSwitch, SwitchProps } from 'react-native'

export function Switch(props: SwitchProps) {
  return (
    <RNSwitch
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={!!props.value ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      {...props}
    />
  )
}
