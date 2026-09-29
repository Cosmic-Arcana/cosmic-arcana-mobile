import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function DisclaimerModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fiction only</Text>
      <Text style={styles.body}>
        Cosmic Arcana does not give advice and does not claim to know the future. NASA and sky data,
        if shown, are symbolic flavour — never proof that a reading is true.
      </Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
    fontSize: 16,
    lineHeight: 24,
  },
});
