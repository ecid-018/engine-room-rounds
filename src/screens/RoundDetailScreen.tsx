import { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getRoundById } from '../storage/roundsRepository';
import type { RoundEntry } from '../types/round';
import type { HistoryStackParamList } from '../navigation/types';
import { CHECKLIST } from '../data/checklist';
import { groupData } from '../utils/grouping';
import { answersToStatusMap } from '../utils/roundConversion';
import { exportRoundAsPdf } from '../utils/exportPdf';
import { HeaderFields } from '../components/HeaderFields';
import { ChecklistAccordion } from '../components/ChecklistAccordion';
import { TierCountBadge } from '../components/TierCountBadge';
import { SubmitBar } from '../components/SubmitBar';
import { spacing, typography, useTheme, type ColorPalette } from '../theme';

type Props = NativeStackScreenProps<HistoryStackParamList, 'RoundDetail'>;

const ALL_SECTIONS = groupData(CHECKLIST);
const ALL_SECTION_NAMES = ALL_SECTIONS.map((s) => s.name);

export function RoundDetailScreen({ route, navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { roundId } = route.params;
  const [round, setRound] = useState<RoundEntry | null | undefined>(undefined);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(ALL_SECTION_NAMES));
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    if (!round || exporting) return;
    setExporting(true);
    try {
      await exportRoundAsPdf(round);
    } catch (err) {
      Alert.alert('Could not export round', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setExporting(false);
    }
  }

  useEffect(() => {
    getRoundById(roundId).then(setRound);
  }, [roundId]);

  useEffect(() => {
    if (round) {
      navigation.setOptions({ title: `${round.date} ${round.time}` });
    }
  }, [round, navigation]);

  const status = useMemo(() => (round ? answersToStatusMap(round.answers) : {}), [round]);

  function toggleSection(name: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  if (round === undefined) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loading}>Loading…</Text>
      </SafeAreaView>
    );
  }

  if (round === null) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loading}>Round not found.</Text>
      </SafeAreaView>
    );
  }

  const counts = { ok: 0, attention: 0, fault: 0 };
  for (const subAnswers of Object.values(round.answers)) {
    for (const tier of Object.values(subAnswers)) {
      if (tier === 0) counts.ok++;
      else if (tier === 1) counts.attention++;
      else counts.fault++;
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <View style={styles.header}>
        <HeaderFields
          date={round.date}
          time={round.time}
          engineerOnDuty={round.engineerOnDuty}
          chiefEngineer={round.chiefEngineer}
          readOnly
        />
        <View style={styles.badgeRow}>
          <TierCountBadge ok={counts.ok} attention={counts.attention} fault={counts.fault} />
        </View>
      </View>

      <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
        <ChecklistAccordion
          sections={ALL_SECTIONS}
          expanded={expanded}
          onToggleSection={toggleSection}
          status={status}
          remarks={round.remarks}
          readOnly
        />
      </ScrollView>

      <SubmitBar label={exporting ? 'Preparing…' : 'Export as PDF'} onPress={handleExport} disabled={exporting} />
    </SafeAreaView>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    flex: {
      flex: 1,
    },
    loading: {
      padding: spacing.lg,
      color: colors.textMuted,
      fontSize: typography.body.fontSize,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.md,
      backgroundColor: colors.panel,
      borderBottomWidth: 1,
      borderBottomColor: colors.line,
    },
    badgeRow: {
      marginTop: spacing.sm,
    },
    scrollContent: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
  });
}
