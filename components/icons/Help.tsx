import Svg, { SvgProps, Circle, Path } from 'react-native-svg'
import { theme } from '~/theme'

export function HelpIcon({ ...props }: SvgProps) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke={theme.palette.text.muted}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      {...props}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
    </Svg>
  )
}
