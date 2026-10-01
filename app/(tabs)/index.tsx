import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import type { SpreadDetailsV1 } from '@cosmic-arcana/sdk';

import { CardSlabs } from '@/components/CardSlabs';
import { Text, View } from '@/components/Themed';
import {
  GRAPHICS_MODES,
  assessMobileGraphics,
  type GraphicsMode,
} from '@/lib/graphics-capability';
import { createSpread, tarotBaseUrl } from '@/lib/tarot-api';

export default function AskScreen() {
  const [question, setQuestion] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spread, setSpread] = useState<SpreadDetailsV1 | null>(null);
  const [mode, setMode] = useState<GraphicsMode>('medium');
  const graphics = assessMobileGraphics();
  const [consent, setConsent] = useState(false);
  const configured = Boolean(tarotBaseUrl());

  const onAsk = async () => {
    setError(null);
    setBusy(true);
    try {
      setSpread(await createSpread(question, consent));
    } catch (cause) {
      setSpread(null);
      setError(cause instanceof Error ? cause.message : 'request failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Cosmic Arcana</Text>
      <Text style={styles.disclaimer}>
        Readings are fiction and entertainment. They are not advice and not a factual claim about
        the future. Interpretations, when present, are AI-generated.
      </Text>
      {!configured ? (
        <Text style={styles.hint}>
          Set EXPO_PUBLIC_TAROT_BASE_URL to a running tarot-service-api (for example
          http://127.0.0.1:3004 on a simulator). Until then this screen does not invent a spread.
        </Text>
      ) : null}
      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Ask a question"
        placeholderTextColor="#6b6580"
        multiline
        maxLength={1000}
        style={styles.input}
        editable={!busy}
      />
      <Pressable
        onPress={() => setConsent((value) => !value)}
        style={styles.button}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: consent }}>
        <Text style={styles.hint}>
          {consent ? 'Consent on: ' : 'Tap to consent: '}store this question for a fictional reading.
        </Text>
      </Pressable>
      <Pressable
        onPress={onAsk}
        disabled={busy || !configured || question.trim().length === 0 || !consent}
        style={({ pressed }) => [
          styles.button,
          (busy || !configured || question.trim().length === 0 || !consent) && styles.buttonDisabled,
          pressed && styles.buttonPressed,
        ]}>
        {busy ? <ActivityIndicator color="#0b0714" /> : <Text style={styles.buttonLabel}>Ask</Text>}
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.modes} lightColor="#0b0714" darkColor="#0b0714">
        {GRAPHICS_MODES.map((option) => (
          <Pressable
            key={option}
            onPress={() => setMode(option)}
            disabled={GRAPHICS_MODES.indexOf(option) > GRAPHICS_MODES.indexOf(graphics.maxMode)}
            style={[styles.mode, mode === option && styles.modeOn]}>
            <Text style={styles.modeLabel}>{option}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.hint}>{graphics.reason}</Text>
      <CardSlabs cards={spread?.cards ?? []} mode={mode} motion={graphics.allowMotion} />
      {spread ? (
        <View style={styles.card} lightColor="#161022" darkColor="#161022">
          <Text style={styles.section}>Stub fields from tarot-service-api</Text>
          <Text style={styles.meta}>id {spread.spreadId}</Text>
          <Text style={styles.body}>{spread.prediction}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 24,
    gap: 16,
    backgroundColor: '#0b0714',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.85,
  },
  hint: {
    fontSize: 13,
    lineHeight: 18,
    color: '#c4b5fd',
  },
  input: {
    minHeight: 96,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3f3356',
    color: '#f5f3ff',
    padding: 12,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#c4b5fd',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonLabel: {
    color: '#0b0714',
    fontWeight: '600',
  },
  error: {
    color: '#fca5a5',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  section: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    opacity: 0.7,
  },
  meta: {
    fontSize: 12,
    opacity: 0.6,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
  },
  modes: {
    flexDirection: 'row',
    gap: 8,
  },
  mode: {
    borderWidth: 1,
    borderColor: '#7c3aed',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  modeOn: {
    backgroundColor: '#3b0764',
  },
  modeLabel: {
    color: '#f5f3ff',
    fontSize: 13,
  },
});
