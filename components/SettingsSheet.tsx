import { Text, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import Button from './Button'
import { useStore } from '../store'

interface Props {
  ref: React.ForwardedRef<BottomSheetModal<any>> | undefined
}

export default function SettingsSheet({ ref }: Props) {
  const dawnTime = useStore((s) => s.dawnTime)
  const setDawnTime = useStore((s) => s.setDawnTime)

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      // snapPoints={['50%', '100%']}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.7}
          style={{ cursor: 'pointer' }}
        />
      )}
    >
      <BottomSheetView style={styles.contentContainer}>
        <SafeAreaView edges={['bottom']}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Change dawn time</Text>
            <Text style={styles.icon}>❓</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              variant={dawnTime === 'astro' ? 'solid' : 'outline'}
              title="Astronomical twilight"
              onPress={() => setDawnTime('astro')}
            />
            <Button
              variant={dawnTime === 'nautical' ? 'solid' : 'outline'}
              title="Nautical twilight"
              onPress={() => setDawnTime('nautical')}
            />
            <Button
              variant={dawnTime === 'civil' ? 'solid' : 'outline'}
              title="Civil twilight"
              onPress={() => setDawnTime('civil')}
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
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {},
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
})
