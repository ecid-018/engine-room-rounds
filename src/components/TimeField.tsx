import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { colors, spacing, typography, radius } from '../theme';
import { toHHmm } from '../utils/format';

interface TimeFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function parseHHmm(value: string): Date {
  const [h, m] = value.split(':').map(Number);
  const d = new Date();
  d.setHours(h || 0, m || 0, 0, 0);
  return d;
}

export function TimeField({ value, onChange }: TimeFieldProps) {
  const [showPicker, setShowPicker] = useState(false);
  const dateValue = parseHHmm(value);

  function handleChange(event: DateTimePickerEvent, selected?: Date) {
    if (Platform.OS === 'android') setShowPicker(false);
    if (event.type === 'dismissed') return;
    if (selected) onChange(toHHmm(selected));
  }

  if (Platform.OS === 'ios') {
    return (
      <DateTimePicker
        value={dateValue}
        mode="time"
        display="compact"
        themeVariant="light"
        accentColor={colors.navy}
        onChange={handleChange}
        style={styles.iosPicker}
      />
    );
  }

  return (
    <>
      <Pressable style={styles.field} onPress={() => setShowPicker(true)}>
        <Text style={styles.fieldText}>{value}</Text>
      </Pressable>
      {showPicker ? (
        <DateTimePicker value={dateValue} mode="time" display="default" onChange={handleChange} />
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
