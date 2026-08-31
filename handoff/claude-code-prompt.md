# Build: Engine Room Rounds — offline mobile app

Build a cross-platform mobile app (Android + iOS) for logging engine room rounds
aboard MV Queen Trader and sister vessels. **Fully offline, local-device storage
only — no backend, no network calls, no cloud sync.**

## Stack
- React Native with Expo (managed workflow) so one codebase ships to both
  Android and iOS.
- Local persistence: `expo-sqlite` (preferred, since we need queryable history
  of past rounds) or `@react-native-async-storage/async-storage` if you judge
  the data simple enough — your call, but it must survive app restarts and
  work with zero connectivity.
- Navigation: `@react-navigation/native` (stack + maybe tabs for
  "New Round" / "History").
- No third-party analytics, no ads, no telemetry.

## Data model
The checklist is fixed reference data (ships it with the app, not user-editable
in v1). Structure:

```ts
type Tier = 0 | 1 | 2; // 0 = Green/Good/In Order, 1 = Needs Attention, 2 = Fault/Defect

interface SubCheck {
  label: string | null;      // e.g. "Temperatures", "Level" — null if the item has only one sub-check
  tickers: [string, string, string]; // text for tier 0, 1, 2 respectively
}

interface Checkpoint {
  id: string;          // e.g. "6.18.1", "8.7-NO2" (unit-expanded items get a suffixed id)
  section: string;      // e.g. "Engine Lower Deck"
  subGroup: string | null; // e.g. "BWTS Area", "Generator Engines"
  checkpoint: string;   // display name, e.g. "GE no. 1"
  subchecks: SubCheck[]; // 1 item = single ticker row; >1 = independent tri-state rows
}
```

I'll provide the full JSON array of ~179 checkpoints (already flattened —
items that had multiple physical units like "Cooling SW Pumps [No 1/2/3]" are
already split into separate checkpoint rows with suffixed ids). Import it as
static seed data (e.g. `src/data/checklist.json`).

Each **round** a user logs should persist as:

```ts
interface RoundEntry {
  roundId: string;        // uuid, generated on start
  date: string;            // ISO date
  time: string;             // HH:mm
  engineerOnDuty: string;
  chiefEngineer: string;
  answers: {
    [checkpointId: string]: {
      [subcheckIndex: number]: Tier;
    };
  };
  remarks: { [checkpointId: string]: string };
  submittedAt: string; // ISO timestamp, set when round is marked complete
}
```

## Screens

### 1. New Round (main screen)
- Header fields: **Date** (date picker, defaults to today), **Time** (time
  picker, defaults to now), **Engineer on Duty** (text input), **Chief
  Engineer** (text input). At least one of these two name fields should be
  required before the round can be submitted.
- Progress summary: items completed / total, plus OK / Needs Attention /
  Fault counts, updating live.
- Search bar to filter checkpoints by name/section.
- Checklist grouped into collapsible sections (10 sections) and sub-groups
  within a section (e.g. "Incinerator", "Tanks", "BWTS Area" inside their
  parent section) — collapsed by default except the first, expand/collapse on
  tap, similar to an accordion.
- Each checkpoint row shows:
  - id + checkpoint name
  - one row of 3 tier buttons per sub-check (label above the row if the
    sub-check has one, e.g. "Temperatures")
  - tapping a tier button selects it (single-select per sub-check, tap again
    to deselect); color-code tier 0 green, tier 1 amber, tier 2 red
  - a small "note" toggle that reveals a remarks text field for that
    checkpoint
  - a colored dot indicator on the row if any sub-check is in tier 1 or 2, so
    problems are visible even when the section is collapsed (roll up worst
    status per section header too)
- Sticky/floating "Submit Round" button at the bottom showing live completion
  count. On submit: validate at least Engineer on Duty or Chief Engineer is
  filled, save the RoundEntry to local storage, then show a confirmation and
  return to a fresh round (clear all tier selections, keep date/time
  defaults refreshed to now).

### 2. History
- List of past submitted rounds, most recent first, showing date/time,
  who signed it, and a quick OK/Attention/Fault count badge.
- Tap into a round to view it read-only — same accordion layout, but showing
  the tier that was selected for each item (no editing) plus any remarks.
- Rounds with any Fault-tier answers should be visually flagged in the list
  (e.g. red accent) so a Chief Engineer can scan for defects across history
  quickly.

### 3. Export (nice-to-have, do this last if time allows)
- Ability to export a single round as a shareable PDF or CSV via the device's
  native share sheet (`expo-sharing` / `expo-print`), entirely local — no
  server round-trip. This is for handing a physical/PDF copy to the office,
  not for cloud storage.

## Visual style
Dark, industrial control-room aesthetic — dark slate background, amber as the
primary accent (matches ECR panel lighting), monospace for checkpoint IDs,
green/amber/red exactly for the three tiers (no ambiguity — this is a safety
tool). Should be comfortable to read in a dim engine room and usable one-handed
while holding a torch/handheld light.

## Explicit constraints
- No network requests anywhere in the app. No login, no accounts.
- All data must stay on the device. If the user asks for cloud
  backup/sync later, that's a future feature — do not build it now.
- Must run on both iOS and Android from the same codebase via Expo.
- Seed checklist data ships with the app bundle, not fetched remotely.

## What I'll hand you alongside this prompt
- `checklist.json` — the full flattened checkpoint array described above,
  ready to drop into `src/data/`.

Ask me for the JSON file if you don't already have it attached, then scaffold
the Expo project, wire up SQLite/AsyncStorage persistence, and build the New
Round and History screens per the spec above.
