import { Text, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import Button from './Button'
import IconButton from './IconButton'
import { HelpIcon } from './icons/Help'
import { useSettingsStore } from '~/store/settings'
import { useLocationStore } from '~/store/location'
import { Switch } from './Switch'
import { theme } from '~/theme'

interface Props {
  ref: React.ForwardedRef<BottomSheetModal<any>> | undefined
}

export default function SettingsSheet({ ref }: Props) {
  const dawnType = useSettingsStore((s) => s.dawnType)
  const setDawnType = useSettingsStore((s) => s.setDawnType)
  const timeFormat = useSettingsStore((s) => s.timeFormat)
  const setTimeFormat = useSettingsStore((s) => s.setTimeFormat)
  const locationFormat = useSettingsStore((s) => s.locationFormat)
  const setLocationFormat = useSettingsStore((s) => s.setLocationFormat)
  const formattedAddress = useLocationStore((s) => s.formattedAddress)
  const showLocation = useSettingsStore((s) => s.showLocation)
  const setShowLocation = useSettingsStore((s) => s.setShowLocation)
  const onlyShowNextTime = useSettingsStore((s) => s.onlyShowNextTime)
  const setOnlyShowNextTime = useSettingsStore((s) => s.setOnlyShowNextTime)

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      snapPoints={['25%']}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.7}
          style={{ cursor: 'pointer' }}
        />
      )}
      backgroundStyle={{ backgroundColor: theme.palette.background }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <SafeAreaView edges={['bottom']}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Dawn time</Text>
            <IconButton style={styles.iconButton} icon={<HelpIcon />} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              variant={dawnType === 'astro' ? 'solid' : 'outline'}
              title="Astronomical"
              onPress={() => setDawnType('astro')}
            />
            <Button
              style={styles.button}
              variant={dawnType === 'nautical' ? 'solid' : 'outline'}
              title="Nautical"
              onPress={() => setDawnType('nautical')}
            />
            <Button
              style={styles.button}
              variant={dawnType === 'civil' ? 'solid' : 'outline'}
              title="Civil"
              onPress={() => setDawnType('civil')}
            />
          </View>
          <View style={[styles.headingContainer, { marginTop: 20 }]}>
            <Text style={styles.heading}>Time format</Text>
            <IconButton style={styles.iconButton} icon={<HelpIcon />} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              variant={timeFormat === 'absolute' ? 'solid' : 'outline'}
              title="Absolute"
              onPress={() => setTimeFormat('absolute')}
            />
            <Button
              style={styles.button}
              variant={timeFormat === 'relative' ? 'solid' : 'outline'}
              title="Relative"
              onPress={() => setTimeFormat('relative')}
            />
          </View>
          <View style={[styles.headingContainer, { marginTop: 20 }]}>
            <Text
              style={[styles.heading, !showLocation && styles.textDisabled]}
            >
              Location format
            </Text>
            <IconButton
              style={[styles.iconButton, !showLocation && styles.textDisabled]}
              disabled={!showLocation}
              icon={<HelpIcon />}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              variant={locationFormat === 'address' ? 'solid' : 'outline'}
              title="Address"
              onPress={() => setLocationFormat('address')}
              disabled={!formattedAddress || !showLocation}
            />
            <Button
              style={styles.button}
              variant={locationFormat === 'coords' ? 'solid' : 'outline'}
              title="Coordinates"
              onPress={() => setLocationFormat('coords')}
              disabled={!showLocation}
            />
          </View>
          <View style={[styles.switchContainer, { marginTop: 20 }]}>
            <View style={styles.switchHeadingContainer}>
              <Text style={styles.heading}>Show location</Text>
              <IconButton style={styles.iconButton} icon={<HelpIcon />} />
            </View>
            <Switch value={showLocation} onValueChange={setShowLocation} />
          </View>
          <View style={[styles.switchContainer]}>
            <View style={styles.switchHeadingContainer}>
              <Text style={styles.heading}>Only show next time</Text>
              <IconButton style={styles.iconButton} icon={<HelpIcon />} />
            </View>
            <Switch
              value={onlyShowNextTime}
              onValueChange={setOnlyShowNextTime}
            />
          </View>
        </SafeAreaView>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 12,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textDisabled: {
    color: theme.palette.text.muted,
    opacity: 0.3,
  },
  iconButton: {},
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    // flexGrow: 1,
  },
})
