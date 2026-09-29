import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What this is</Text>
      <Text style={styles.body}>
        Cosmic Arcana is a fictional fortune-teller. Any NASA or astronomical data used later is
        real-world context for symbolism only. It is never evidence that a prediction works.
      </Text>
      <Text style={styles.body}>
        Card meanings, spread types, and prediction format are not defined yet. The Ask tab posts
        to tarot-service-api and shows the stub generator fields as they are stored. Cards on Ask
        and Watch are 3D slabs of those ids, not invented artwork.
      </Text>
      <Text style={styles.body}>
        Sign-in is not wired. A fixed demo user id is sent until authority-service-api exists.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.9,
  },
});
