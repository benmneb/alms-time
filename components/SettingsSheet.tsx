import { useCallback, useRef, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import Button from './Button'
import IconButton from './IconButton'
import { HelpIcon } from './icons/Help'
import { useSettingsStore } from '~/store/settings'
import { useLocationStore } from '~/store/location'
import { Switch } from './Switch'
import { theme } from '~/theme'
import SettingsHelpSheet, { SettingsHelpSheetProps } from './SettingsHelpSheet'

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
  const timeOffset = useSettingsStore((s) => s.timeOffset)
  const setTimeOffset = useSettingsStore((s) => s.setTimeOffset)
  const isUsingTimeOffset = useSettingsStore((s) => s.isUsingTimeOffset)
  const setIsUsingTimeOffset = useSettingsStore((s) => s.setIsUsingTimeOffset)

  const [helpContents, setHelpContents] =
    useState<SettingsHelpSheetProps['content']>('dawnTimes')
  const helpSheetRef = useRef<BottomSheetModal>(null)
  const handleHelpPress = useCallback(
    (content: SettingsHelpSheetProps['content']) => {
      setHelpContents(content)
      helpSheetRef.current?.present()
    },
    []
  )

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      snapPoints={['30%']}
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
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <SafeAreaView edges={['bottom']} style={styles.content}>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Dawn time</Text>
            <IconButton
              style={styles.iconButton}
              icon={<HelpIcon />}
              onPress={() => handleHelpPress('dawnTimes')}
            />
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
            <IconButton
              style={styles.iconButton}
              icon={<HelpIcon />}
              onPress={() => handleHelpPress('timeFormat')}
            />
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
              onPress={() => handleHelpPress('locationFormat')}
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
              <IconButton
                style={styles.iconButton}
                icon={<HelpIcon />}
                onPress={() => handleHelpPress('showLocation')}
              />
            </View>
            <Switch value={showLocation} onValueChange={setShowLocation} />
          </View>
          <View style={styles.switchContainer}>
            <View style={styles.switchHeadingContainer}>
              <Text style={styles.heading}>Only show next time</Text>
              <IconButton
                style={styles.iconButton}
                icon={<HelpIcon />}
                onPress={() => handleHelpPress('onlyShowNextTime')}
              />
            </View>
            <Switch
              value={onlyShowNextTime}
              onValueChange={setOnlyShowNextTime}
            />
          </View>
          <View style={styles.switchContainer}>
            <View style={styles.switchHeadingContainer}>
              <Text style={styles.heading}>Time offset</Text>
              <IconButton
                style={styles.iconButton}
                icon={<HelpIcon />}
                onPress={() => handleHelpPress('timeOffset')}
              />
            </View>
            <Switch
              value={isUsingTimeOffset}
              onValueChange={setIsUsingTimeOffset}
            />
          </View>
          <View style={styles.buttonContainer}>
            {[1, 2, 3, 5, 10, 15].map((offsetMins) => (
              <Button
                key={offsetMins}
                style={styles.button}
                title={`${offsetMins} ${offsetMins > 1 ? 'mins' : 'min'}`}
                variant={timeOffset === offsetMins ? 'solid' : 'outline'}
                onPress={() => setTimeOffset(offsetMins)}
                disabled={!isUsingTimeOffset}
              />
            ))}
          </View>
        </SafeAreaView>
        <SettingsHelpSheet ref={helpSheetRef} content={helpContents} />
      </BottomSheetScrollView>
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
  content: {
    maxWidth: theme.breakpoints.xs,
    alignSelf: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.palette.text.muted,
    marginBottom: 12,
    textAlign: 'center',
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
