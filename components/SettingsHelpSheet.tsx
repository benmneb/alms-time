import { Text, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import { theme } from '~/theme'

export interface SettingsHelpSheetProps {
  ref: React.ForwardedRef<BottomSheetModal<any>> | undefined
  content:
    | 'dawnTimes'
    | 'timeFormat'
    | 'locationFormat'
    | 'showLocation'
    | 'onlyShowNextTime'
}

export default function SettingsHelpSheet({
  ref,
  content,
}: SettingsHelpSheetProps) {
  if (!content) return null

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      stackBehavior="push"
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
          {content === 'dawnTimes' && (
            <>
              <Text style={styles.title}>About dawn times</Text>
              <Text style={styles.section}>
                Dawn isn’t just one moment — it unfolds gradually in phases,
                depending on how far the sun is below the horizon.
              </Text>
              <View style={styles.section}>
                <Text style={styles.heading}>Astronomical Dawn</Text>
                <Text style={styles.bullet}>
                  • Sun is 18° below the horizon
                </Text>
                <Text style={styles.bullet}>• The earliest phase of dawn</Text>
                <Text style={styles.bullet}>
                  • The sky is still very dark, but the first faint light begins
                  - usually too dark for normal activity
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.heading}>Nautical Dawn</Text>
                <Text style={styles.bullet}>
                  • Sun is 12° below the horizon
                </Text>
                <Text style={styles.bullet}>
                  • Horizon becomes faintly visible while at sea
                </Text>
                <Text style={styles.bullet}>
                  • The sky starts to lighten, but it’s not yet bright enough to
                  read without artificial light
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.heading}>Civil Dawn</Text>
                <Text style={styles.bullet}>• Sun is 6° below the horizon</Text>
                <Text style={styles.bullet}>
                  • The sky is noticeably brighter
                </Text>
                <Text style={styles.bullet}>
                  • You can see clearly outdoors without artificial lighting
                </Text>
              </View>
            </>
          )}
          {content === 'timeFormat' && (
            <>
              <Text style={styles.title}>About time formats</Text>
              <View style={styles.section}>
                <Text style={styles.heading}>Absolute time</Text>
                <Text style={styles.bullet}>
                  • The time format of your local time zone
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.heading}>Relative time</Text>
                <Text style={styles.bullet}>
                  • Seconds / minutes / hours to or from the relevant event
                </Text>
              </View>
            </>
          )}
          {content === 'locationFormat' && (
            <>
              <Text style={styles.title}>About location formats</Text>
              <Text style={styles.section}>
                Your location is gathered from your device geolocation API
                without the need for an internet connection. No matter how it's
                displayed, the accuracy is the same.
              </Text>
              <View style={styles.section}>
                <Text style={styles.heading}>Address</Text>
                <Text style={styles.bullet}>
                  • The human-readable address inferred from your devices
                  geolocation API
                </Text>
                <Text style={styles.bullet}>
                  • Displayed by default if you have an internet connection
                </Text>
                <Text style={styles.bullet}>
                  • Unable to be displayed without an internet connection
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.heading}>Coordinates</Text>
                <Text style={styles.bullet}>
                  • The raw coordinates from your device (in decimal degrees /
                  latitude and longitude)
                </Text>
                <Text style={styles.bullet}>
                  • Displayed by default without an internet connection
                </Text>
              </View>
            </>
          )}
          {content === 'showLocation' && (
            <>
              {' '}
              <Text style={styles.title}>About hiding location</Text>
              <Text style={styles.section}>
                For a more minimal layout, you can choose to hide your location
                from view.
              </Text>
              <View style={styles.section}>
                <Text style={styles.bullet}>
                  • This only modifies how it's shown
                </Text>
              </View>
            </>
          )}
          {content === 'onlyShowNextTime' && (
            <>
              <Text style={styles.title}>Only show next time</Text>
              <Text style={styles.section}>
                Shows only one time, the next approaching time.
              </Text>
              <View style={styles.section}>
                <Text style={styles.bullet}>
                  • If it's after noon, it will show tomorrows dawn time
                </Text>
                <Text style={styles.bullet}>
                  • Works well with "relative time" enabled and location hidden
                </Text>
              </View>
            </>
          )}
        </SafeAreaView>
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
    maxWidth: theme.breakpoints.sm,
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
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  section: {
    marginBottom: 16,
    fontSize: 16,
  },
  bullet: {
    marginBottom: 4,
    fontSize: 16,
  },
})
