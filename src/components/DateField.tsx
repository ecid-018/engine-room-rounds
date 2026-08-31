import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { colors, spacing, typography, radius } from '../theme';
import { formatDisplayDate, toLocalISODate } from '../utils/format';

interface DateFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function parseISODate(value: string): Date {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y || 1970, (m || 1) - 1, d || 1);
}

export function DateField({ value, onChange }: DateFieldProps) {
  const [showPicker, setShowPicker] = useState(false);
  const dateValue = parseISODate(value);

  function handleChange(event: DateTimePickerEvent, selected?: Date) {
    if (Platform.OS === 'android') setShowPicker(false);
    if (event.type === 'dismissed') return;
    if (selected) onChange(toLocalISODate(selected));
  }

  if (Platform.OS === 'ios') {
    return (
      <DateTimePicker
        value={dateValue}
        mode="date"
        display="compact"
        themeVariant="dark"
        accentColor={colors.amber}
        onChange={handleChange}
        style={styles.iosPicker}
      />
    );
  }

  return (
    <>
      <Pressable style={styles.field} onPress={() => setShowPicker(true)}>
        <Text style={styles.fieldText}>{formatDisplayDate(value)}</Text>
      </Pressable>
      {showPicker ? (
        <DateTimePicker value={dateValue} mode="date" display="default" onChange={handleChange} />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
  },
  fieldText: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
  },
  iosPicker: {
    alignSelf: 'flex-start',
  },
});
