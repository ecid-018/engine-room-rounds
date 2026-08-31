import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, spacing, typography, radius } from '../theme';
import { DateField } from './DateField';
import { TimeField } from './TimeField';
import { formatDisplayDate } from '../utils/format';

interface HeaderFieldsProps {
  date: string;
  time: string;
  engineerOnDuty: string;
  chiefEngineer: string;
  readOnly: boolean;
  onChangeDate?: (v: string) => void;
  onChangeTime?: (v: string) => void;
  onChangeEngineerOnDuty?: (v: string) => void;
  onChangeChiefEngineer?: (v: string) => void;
}

export function HeaderFields({
  date,
  time,
  engineerOnDuty,
  chiefEngineer,
  readOnly,
  onChangeDate,
  onChangeTime,
  onChangeEngineerOnDuty,
  onChangeChiefEngineer,
}: HeaderFieldsProps) {
  return (
    <View style={styles.grid}>
      <View style={styles.cell}>
        <Text style={styles.label}>Date</Text>
        {readOnly ? (
          <Text style={styles.readOnlyValue}>{formatDisplayDate(date)}</Text>
        ) : (
          <DateField value={date} onChange={(v) => onChangeDate?.(v)} />
        )}
      </View>
      <View style={styles.cell}>
        <Text style={styles.label}>Time</Text>
        {readOnly ? (
          <Text style={styles.readOnlyValue}>{time}</Text>
        ) : (
          <TimeField value={time} onChange={(v) => onChangeTime?.(v)} />
        )}
      </View>
      <View style={styles.cell}>
        <Text style={styles.label}>Engr. on Duty</Text>
        {readOnly ? (
          <Text style={styles.readOnlyValue}>{engineerOnDuty || '—'}</Text>
        ) : (
          <TextInput
            value={engineerOnDuty}
            onChangeText={onChangeEngineerOnDuty}
            placeholder="Name / initials"
            placeholderTextColor={colors.textDim}
            style={styles.input}
          />
        )}
      </View>
      <View style={styles.cell}>
        <Text style={styles.label}>Chief Engineer</Text>
        {readOnly ? (
          <Text style={styles.readOnlyValue}>{chiefEngineer || '—'}</Text>
        ) : (
          <TextInput
            value={chiefEngineer}
            onChangeText={onChangeChiefEngineer}
            placeholder="Name / initials"
            placeholderTextColor={colors.textDim}
            style={styles.input}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  cell: {
    flexBasis: '47%',
    flexGrow: 1,
  },
  label: {
    fontSize: typography.tiny.fontSize,
    color: colors.textFaint,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  readOnlyValue: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    paddingVertical: 8,
  },
});
