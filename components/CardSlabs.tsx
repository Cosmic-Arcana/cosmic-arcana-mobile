import { useEffect } from 'react';
import { StyleSheet, View, type GestureResponderEvent, type LayoutChangeEvent } from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import type { SpreadCardV1 } from '@cosmic-arcana/sdk';

import { Text } from '@/components/Themed';

type CardSlabsProps = {
  cards: SpreadCardV1[];
  compact?: boolean;
};

function Slab({
  card,
  index,
  compact,
  tiltX,
  tiltY,
}: {
  card: SpreadCardV1 | null;
  index: number;
  compact: boolean;
  tiltX: SharedValue<number>;
  tiltY: SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => ({
    transform: [
      { perspective: 900 },
      { rotateX: `${tiltY.value * 18}deg` },
      { rotateY: `${tiltX.value * 22}deg` },
      { rotateZ: `${tiltX.value * tiltY.value * 10 + (index - 1) * 8}deg` },
      { scale: compact ? 0.72 : 1 },
    ],
  }));

  return (
    <Animated.View style={[compact ? styles.slabCompact : styles.slab, style]}>
      <View style={styles.gold} />
      <Text style={styles.face}>{card ? card.cardId : '—'}</Text>
      {card ? (
        <Text style={styles.meta}>
          {card.positionKey}
          {card.reversed ? ' · rev' : ''}
        </Text>
      ) : (
        <Text style={styles.meta}>empty</Text>
      )}
    </Animated.View>
  );
}

export function CardSlabs({ cards, compact = false }: CardSlabsProps) {
  const shown: Array<SpreadCardV1 | null> =
    cards.length === 0 ? [null] : cards.slice(0, 3);
  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);
  const width = useSharedValue(1);
  const height = useSharedValue(1);

  const onLayout = (event: LayoutChangeEvent) => {
    width.value = Math.max(event.nativeEvent.layout.width, 1);
    height.value = Math.max(event.nativeEvent.layout.height, 1);
  };

  const onMove = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const nx = (locationX / width.value) * 2 - 1;
    const ny = (locationY / height.value) * 2 - 1;
    tiltX.value = withSpring(Math.max(-1, Math.min(1, nx)), { damping: 18 });
    tiltY.value = withSpring(Math.max(-1, Math.min(1, -ny)), { damping: 18 });
  };

  useEffect(() => {
    return () => {
      tiltX.value = 0;
      tiltY.value = 0;
    };
  }, [tiltX, tiltY]);

  return (
    <View
      style={[styles.row, compact && styles.rowCompact]}
      onLayout={onLayout}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderMove={onMove}>
      {shown.map((card, index) => (
        <Slab
          key={card ? `${card.positionKey}-${card.cardId}` : `empty-${index}`}
          card={card}
          index={index}
          compact={compact}
          tiltX={tiltX}
          tiltY={tiltY}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 220,
    gap: 8,
  },
  rowCompact: {
    minHeight: 140,
    gap: 2,
  },
  slab: {
    width: 92,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#1a1030',
    borderWidth: 1,
    borderColor: '#d4af37',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    shadowColor: '#7c3aed',
    shadowOpacity: 0.55,
    shadowRadius: 12,
  },
  slabCompact: {
    width: 56,
    height: 92,
    borderRadius: 8,
    backgroundColor: '#1a1030',
    borderWidth: 1,
    borderColor: '#d4af37',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  gold: {
    position: 'absolute',
    top: 10,
    width: '60%',
    height: 3,
    backgroundColor: '#d4af37',
    borderRadius: 2,
  },
  face: {
    fontSize: 11,
    textAlign: 'center',
    color: '#f5f3ff',
  },
  meta: {
    marginTop: 8,
    fontSize: 9,
    opacity: 0.7,
    textAlign: 'center',
  },
});
