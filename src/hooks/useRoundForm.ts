import { useCallback, useMemo, useState } from 'react';
import type { Tier } from '../types/checklist';
import { CHECKLIST } from '../data/checklist';
import { filterChecklist, groupData, isItemDone, statusKey } from '../utils/grouping';
import { toHHmm, toLocalISODate } from '../utils/format';

function freshDateTime() {
  const now = new Date();
  return { date: toLocalISODate(now), time: toHHmm(now) };
}

const FIRST_SECTION = CHECKLIST[0]?.section;

export function useRoundForm() {
  const [status, setStatus] = useState<Record<string, Tier>>({});
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [openRemarkId, setOpenRemarkId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(FIRST_SECTION ? [FIRST_SECTION] : []));
  const [query, setQuery] = useState('');

  const initial = freshDateTime();
  const [date, setDate] = useState(initial.date);
  const [time, setTime] = useState(initial.time);
  const [engineerOnDuty, setEngineerOnDuty] = useState('');
  const [chiefEngineer, setChiefEngineer] = useState('');

  const filteredItems = useMemo(() => filterChecklist(CHECKLIST, query), [query]);
  const sections = useMemo(() => groupData(filteredItems), [filteredItems]);

  const totalItems = CHECKLIST.length;
  const doneItems = useMemo(() => CHECKLIST.filter((i) => isItemDone(i, status)).length, [status]);
  const totalSubchecks = useMemo(() => CHECKLIST.reduce((n, i) => n + i.subchecks.length, 0), []);
  const doneSubchecks = Object.keys(status).length;

  const { okCount, attentionCount, faultCount } = useMemo(() => {
    let ok = 0;
    let attention = 0;
    let fault = 0;
    for (const tier of Object.values(status)) {
      if (tier === 0) ok++;
      else if (tier === 1) attention++;
      else fault++;
    }
    return { okCount: ok, attentionCount: attention, faultCount: fault };
  }, [status]);

  const isValid = engineerOnDuty.trim().length > 0 || chiefEngineer.trim().length > 0;

  const setTier = useCallback((checkpointId: string, subIndex: number, tier: Tier) => {
    const key = statusKey(checkpointId, subIndex);
    setStatus((prev) => {
      const next = { ...prev };
      if (next[key] === tier) delete next[key];
      else next[key] = tier;
      return next;
    });
  }, []);

  const toggleSection = useCallback((name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const toggleRemark = useCallback((checkpointId: string) => {
    setOpenRemarkId((prev) => (prev === checkpointId ? null : checkpointId));
  }, []);

  const setRemarkText = useCallback((checkpointId: string, text: string) => {
    setRemarks((prev) => ({ ...prev, [checkpointId]: text }));
  }, []);

  const resetForm = useCallback(() => {
    setStatus({});
    setRemarks({});
    setOpenRemarkId(null);
    setExpanded(new Set(FIRST_SECTION ? [FIRST_SECTION] : []));
    setQuery('');
    const fresh = freshDateTime();
    setDate(fresh.date);
    setTime(fresh.time);
    setEngineerOnDuty('');
    setChiefEngineer('');
  }, []);

  return {
    status,
    remarks,
    openRemarkId,
    expanded,
    query,
    date,
    time,
    engineerOnDuty,
    chiefEngineer,
    sections,
    totalItems,
    doneItems,
    totalSubchecks,
    doneSubchecks,
    okCount,
    attentionCount,
    faultCount,
    isValid,
    setTier,
    toggleSection,
    toggleRemark,
    setRemarkText,
    setQuery,
    setDate,
    setTime,
    setEngineerOnDuty,
    setChiefEngineer,
    resetForm,
  };
}
