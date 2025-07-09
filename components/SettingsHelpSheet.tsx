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
    | 'timeOffset'
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
                Dawn isn’t a single moment — it gradually unfolds in phases,
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
                  • The sky begins to lighten, but it’s not yet bright enough to
                  see clearly without artificial light
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
                  • Shows clock time based on your current time zone
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.heading}>Relative time</Text>
                <Text style={styles.bullet}>
                  • Shows time as a countdown or count-up to/from each event
                  (e.g., “in 23 minutes” or “2 hours ago”)
                </Text>
              </View>
            </>
          )}
          {content === 'locationFormat' && (
            <>
              <Text style={styles.title}>About location formats</Text>
              <Text style={styles.section}>
                Your location is detected directly from your device’s GPS, even
                without internet. The accuracy is the same no matter how it’s
                displayed.
              </Text>
              <View style={styles.section}>
                <Text style={styles.heading}>Address</Text>
                <Text style={styles.bullet}>
                  • A human-readable address (like a street or city name)
                </Text>
                <Text style={styles.bullet}>
                  • Shown by default if an internet connection is available
                </Text>
                <Text style={styles.bullet}>• Not available offline</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.heading}>Coordinates</Text>
                <Text style={styles.bullet}>
                  • Raw GPS coordinates (latitude and longitude)
                </Text>
                <Text style={styles.bullet}>
                  • Shown by default when you’re offline
                </Text>
              </View>
            </>
          )}
          {content === 'showLocation' && (
            <>
              <Text style={styles.title}>About hiding location</Text>
              <Text style={styles.section}>
                You can hide your location for a simpler, more focused layout.
              </Text>
              <View style={styles.section}>
                <Text style={styles.bullet}>
                  • This only affects how the location is displayed — not how it
                  works in the background
                </Text>
              </View>
            </>
          )}
          {content === 'onlyShowNextTime' && (
            <>
              <Text style={styles.title}>About only show next time</Text>
              <Text style={styles.section}>
                Shows just the next upcoming time.
              </Text>
              <View style={styles.section}>
                <Text style={styles.bullet}>
                  • After midday, this means tomorrow’s dawn will be shown
                </Text>
                <Text style={styles.bullet}>
                  • Works well with relative time enabled and location hidden
                  for a minimal view
                </Text>
              </View>
            </>
          )}
          {content === 'timeOffset' && (
            <>
              <Text style={styles.title}>About time offset</Text>
              <Text style={styles.section}>
                Adds a buffer to the selected times for safety or personal
                preference.
              </Text>
              <View style={styles.section}>
                <Text style={styles.heading}>Dawn</Text>
                <Text style={styles.bullet}>
                  • The offset is added to the actual time (making the displayed
                  time later)
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.heading}>Noon</Text>
                <Text style={styles.bullet}>
                  • The offset is subtracted from the actual time (making the
                  displayed time earlier)
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
