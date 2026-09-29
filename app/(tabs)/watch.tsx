import { StyleSheet, View } from 'react-native';

import { CardSlabs } from '@/components/CardSlabs';
import { Text } from '@/components/Themed';

export default function WatchScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.note}>
        Preview of a round watch face. Native watchOS / Wear OS is not chosen yet (product gap).
      </Text>
      <View style={styles.bezel}>
        <View style={styles.face}>
          <CardSlabs cards={[]} compact />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#05010d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 20,
  },
  note: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    opacity: 0.8,
  },
  bezel: {
    width: 198,
    height: 242,
    borderRadius: 42,
    borderWidth: 2,
    borderColor: 'rgba(212,175,55,0.45)',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  face: {
    width: 186,
    height: 186,
    borderRadius: 93,
    overflow: 'hidden',
    backgroundColor: '#05010d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
