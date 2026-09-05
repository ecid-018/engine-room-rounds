import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { RoundListRow } from '../types/round';
import { spacing, typography, radius, useTheme, type ColorPalette } from '../theme';
import { formatDisplayDate } from '../utils/format';
import { TierCountBadge } from './TierCountBadge';

interface RoundListItemProps {
  round: RoundListRow;
  onPress: () => void;
}

export function RoundListItem({ round, onPress }: RoundListItemProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const flagged = round.faultCount > 0;
  const signedBy = [round.engineerOnDuty, round.chiefEngineer].filter(Boolean).join(' / ');

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        flagged ? styles.flagged : null,
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={styles.topRow}>
        <Text style={styles.dateTime}>
          {formatDisplayDate(round.date)} · {round.time}
        </Text>
        {flagged ? <Text style={styles.flag}>FAULT</Text> : null}
      </View>
      <Text style={styles.signedBy}>{signedBy || 'Unsigned'}</Text>
      <TierCountBadge ok={round.okCount} attention={round.attentionCount} fault={round.faultCount} />
    </Pressable>
  );
}

function createStyles(colors: ColorPalette) {
  return StyleSheet.create({
    container: {
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.panelAlt,
      padding: spacing.md,
      marginBottom: spacing.sm,
      gap: 4,
    },
    flagged: {
      borderColor: colors.red,
      backgroundColor: colors.redMuted,
    },
    pressed: {
      opacity: 0.75,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dateTime: {
      fontSize: typography.body.fontSize,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    flag: {
      fontSize: typography.tiny.fontSize,
      fontWeight: '700',
      color: '#ffffff',
      backgroundColor: colors.errLine,
      letterSpacing: 0.5,
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: 999,
      overflow: 'hidden',
    },
    signedBy: {
      fontSize: typography.small.fontSize,
      color: colors.textMuted,
    },
  });
}
