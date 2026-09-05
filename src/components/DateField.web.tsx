import { spacing, typography, radius, useTheme } from '../theme';

interface DateFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function DateField({ value, onChange }: DateFieldProps) {
  const { colors, mode } = useTheme();
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounds-datetime-input"
      style={{
        backgroundColor: colors.panel,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.sm,
        paddingLeft: spacing.sm,
        paddingRight: spacing.sm,
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: typography.small.fontSize,
        color: colors.textSecondary,
        fontFamily: typography.systemFont,
        width: '100%',
        boxSizing: 'border-box',
        colorScheme: mode,
      }}
    />
  );
}
