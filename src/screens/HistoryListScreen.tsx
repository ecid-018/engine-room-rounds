import { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { listRounds } from '../storage/roundsRepository';
import type { RoundListRow } from '../types/round';
import type { HistoryStackParamList } from '../navigation/types';
import { RoundListItem } from '../components/RoundListItem';
import { EmptyState } from '../components/EmptyState';
import { colors, spacing } from '../theme';

type Props = NativeStackScreenProps<HistoryStackParamList, 'HistoryList'>;

export function HistoryListScreen({ navigation }: Props) {
  const [rounds, setRounds] = useState<RoundListRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      listRounds().then((rows) => {
        if (active) {
          setRounds(rows);
          setLoaded(true);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <FlatList
        data={rounds}
        keyExtractor={(item) => item.roundId}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <RoundListItem round={item} onPress={() => navigation.navigate('RoundDetail', { roundId: item.roundId })} />
        )}
        ListEmptyComponent={
          loaded ? (
            <EmptyState title="No rounds logged yet" subtitle="Submitted rounds will appear here, most recent first." />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: spacing.lg,
    flexGrow: 1,
  },
});
