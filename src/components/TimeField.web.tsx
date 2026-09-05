import { colors, spacing, typography, radius } from '../theme';

interface TimeFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimeField({ value, onChange }: TimeFieldProps) {
  return (
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
        fontFamily: 'inherit',
        width: '100%',
        boxSizing: 'border-box',
        colorScheme: 'light',
      }}
    />
  );
}
