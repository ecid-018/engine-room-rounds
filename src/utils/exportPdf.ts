import { Platform } from 'react-native';
import * as Print from 'expo-print';
import type { Checkpoint } from '../types/checklist';
import type { RoundEntry } from '../types/round';
import { CHECKLIST } from '../data/checklist';
import { groupData, sectionItems } from './grouping';
import { formatDisplayDate } from './format';

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

function tierClass(tier: number | undefined): string {
  if (tier === 2) return 'fault';
  if (tier === 1) return 'attn';
  if (tier === 0) return 'ok';
  return 'blank';
}

function renderItem(item: Checkpoint, round: RoundEntry): string {
  const subRows = item.subchecks
    .map((sc, i) => {
      const tier = round.answers[item.id]?.[i];
      const label = tier === undefined ? 'Not checked' : sc.tickers[tier];
      return `<div class="subcheck">${sc.label ? `<span class="sublabel">${escapeHtml(sc.label)}:</span> ` : ''}<span class="tierval ${tierClass(tier)}">${escapeHtml(label)}</span></div>`;
    })
    .join('');
  const remark = round.remarks[item.id];
  return `<div class="item">
    <div class="itemhead"><span class="id">${escapeHtml(item.id)}</span><span class="name">${escapeHtml(item.checkpoint)}</span></div>
    ${subRows}
    ${remark ? `<div class="remark">Remarks: ${escapeHtml(remark)}</div>` : ''}
  </div>`;
}

export function buildRoundHtml(round: RoundEntry): string {
  const sections = groupData(CHECKLIST);
  const sectionsHtml = sections
    .map((section) => {
      const itemsHtml = sectionItems(section).map((item) => renderItem(item, round)).join('');
      return `<div class="section"><h2>${escapeHtml(section.name)}</h2>${itemsHtml}</div>`;
    })
    .join('');

  let ok = 0;
  let attention = 0;
  let fault = 0;
  for (const subAnswers of Object.values(round.answers)) {
    for (const tier of Object.values(subAnswers)) {
      if (tier === 0) ok++;
      else if (tier === 1) attention++;
      else fault++;
    }
  }

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Engine Room Round — ${escapeHtml(round.date)}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #10202b; margin: 24px; }
  h1 { font-size: 20px; margin-bottom: 2px; color: #0b3d5c; letter-spacing: 0.02em; }
  .subtitle { color: #5b6b76; font-size: 12px; margin-bottom: 16px; }
  .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; border: 1px solid #c9d4dc; border-radius: 6px; padding: 12px; margin-bottom: 12px; font-size: 13px; }
  .meta .label { color: #5b6b76; font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; }
  .summary { font-size: 13px; margin-bottom: 20px; }
  .summary .ok { color: #1c7a4a; } .summary .attn { color: #6b4e00; } .summary .fault { color: #c0392b; font-weight: bold; }
  .section { margin-bottom: 16px; page-break-inside: avoid; }
  .section h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #0b3d5c; border-bottom: 2px solid #0b3d5c; padding-bottom: 4px; margin-bottom: 8px; }
  .item { margin-bottom: 8px; padding-left: 4px; }
  .itemhead { font-size: 12px; }
  .itemhead .id { color: #5b6b76; margin-right: 6px; }
  .itemhead .name { font-weight: 600; }
  .subcheck { font-size: 11px; margin-left: 10px; margin-top: 2px; }
  .sublabel { color: #5b6b76; }
  .tierval.ok { color: #1c7a4a; }
  .tierval.attn { color: #6b4e00; }
  .tierval.fault { color: #c0392b; font-weight: bold; }
  .tierval.blank { color: #8a99a3; font-style: italic; }
  .remark { font-size: 11px; margin-left: 10px; margin-top: 2px; color: #10202b; font-style: italic; }
</style>
</head>
<body>
  <h1>Engine Room Rounds</h1>
  <div class="subtitle">MV Queen Trader &amp; Sister Vessels</div>
  <div class="meta">
    <div><div class="label">Date</div>${escapeHtml(formatDisplayDate(round.date))}</div>
    <div><div class="label">Time</div>${escapeHtml(round.time)}</div>
    <div><div class="label">Engineer on Duty</div>${escapeHtml(round.engineerOnDuty || '—')}</div>
    <div><div class="label">Chief Engineer</div>${escapeHtml(round.chiefEngineer || '—')}</div>
  </div>
  <div class="summary">
    <span class="ok">${ok} OK</span> &nbsp;·&nbsp;
    <span class="attn">${attention} needs attention</span> &nbsp;·&nbsp;
    <span class="fault">${fault} fault</span>
  </div>
  ${sectionsHtml}
</body>
</html>`;
}

export async function exportRoundAsPdf(round: RoundEntry): Promise<void> {
  const html = buildRoundHtml(round);

  if (Platform.OS === 'web') {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Could not open print window — please allow pop-ups for this site.');
    }
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    return;
  }

  await Print.printAsync({ html });
}
