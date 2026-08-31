import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoundForm } from '../hooks/useRoundForm';
import { HeaderFields } from '../components/HeaderFields';
import { ProgressSummary } from '../components/ProgressSummary';
import { SearchBar } from '../components/SearchBar';
import { ChecklistAccordion } from '../components/ChecklistAccordion';
import { SubmitBar } from '../components/SubmitBar';
import { EmptyState } from '../components/EmptyState';
import { colors, spacing, typography } from '../theme';
import { statusMapToAnswers } from '../utils/roundConversion';
import { generateRoundId } from '../utils/id';
import { insertRound } from '../storage/roundsRepository';
import type { RoundEntry } from '../types/round';

export function NewRoundScreen() {
  const form = useRoundForm();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!form.isValid || submitting) return;
    setSubmitting(true);
    const entry: RoundEntry = {
      roundId: generateRoundId(),
      date: form.date,
      time: form.time,
      engineerOnDuty: form.engineerOnDuty.trim(),
      chiefEngineer: form.chiefEngineer.trim(),
      answers: statusMapToAnswers(form.status),
      remarks: form.remarks,
      submittedAt: new Date().toISOString(),
    };

    try {
      await insertRound(entry);
      form.resetForm();
      Alert.alert('Round submitted', `Logged ${entry.date} ${entry.time}.`);
    } catch (err) {
      Alert.alert('Could not save round', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Engine Room Rounds</Text>
          <Text style={styles.subtitle}>MV Queen Trader &amp; Sister Vessels</Text>

          <HeaderFields
            date={form.date}
            time={form.time}
            engineerOnDuty={form.engineerOnDuty}
            chiefEngineer={form.chiefEngineer}
            readOnly={false}
            onChangeDate={form.setDate}
            onChangeTime={form.setTime}
            onChangeEngineerOnDuty={form.setEngineerOnDuty}
            onChangeChiefEngineer={form.setChiefEngineer}
          />

          <ProgressSummary
            doneItems={form.doneItems}
            totalItems={form.totalItems}
            doneSubchecks={form.doneSubchecks}
            totalSubchecks={form.totalSubchecks}
            okCount={form.okCount}
            attentionCount={form.attentionCount}
            faultCount={form.faultCount}
          />

          <SearchBar value={form.query} onChangeText={form.setQuery} />
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {form.sections.length === 0 ? (
            <EmptyState title="No checkpoints match your search" subtitle="Try a different name or area." />
          ) : (
            <ChecklistAccordion
              sections={form.sections}
              expanded={form.expanded}
              onToggleSection={form.toggleSection}
              status={form.status}
              onSelectTier={form.setTier}
              remarks={form.remarks}
              openRemarkId={form.openRemarkId}
              onToggleRemark={form.toggleRemark}
              onChangeRemark={form.setRemarkText}
              readOnly={false}
              forceOpenAll={form.query.trim().length > 0}
            />
          )}
        </ScrollView>

        <SubmitBar
          label={`Submit Round — ${form.date} ${form.time} (${form.doneItems}/${form.totalItems} items, ${form.doneSubchecks}/${form.totalSubchecks} points)`}
          onPress={handleSubmit}
          disabled={!form.isValid || submitting}
          helperText={form.isValid ? undefined : 'Add Engr. on Duty or Chief Engineer before submitting'}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.bg,
  },
  title: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.tiny.fontSize,
    color: colors.textFaint,
    marginBottom: spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
});
