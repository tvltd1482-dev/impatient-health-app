/*
  Personas — same engine, three lives.
  Constitution: CLAUDE.md "These are sacred. Do not rename them. Do not collapse them."

  Display names: Harlow · Bella · Grayson    (final, per HANDOFF.md)
  Internal IDs:  kezia  · simone · renee     (legacy, retained for stable keys)

  NOTE: the dev.impatient.app screenshot dated 2026-05-17 still shows the
  legacy display name "Renee" on the Today persona block. See ISSUE-014 —
  rename has not propagated end-to-end on the live build.
*/

export type PersonaId = 'kezia' | 'simone' | 'renee';
export type Tier = 'Free' | 'Essential' | 'Pro' | 'Enterprise';

export interface Persona {
  id: PersonaId;
  name: string;
  age: number;
  tier: Tier;
  archetype: string;
  role: string;
  locationStr: string;
  conditions: string[];
  systems: string[];
  ledeEyebrow: string;
  ledeHero: string;
  ledeEm: string;
  ledeBody: string;
}

export const PERSONAS: Record<PersonaId, Persona> = {
  kezia: {
    id: 'kezia',
    name: 'Harlow',
    age: 31,
    tier: 'Free',
    archetype: 'The Observer',
    role: 'Secondary-school art teacher',
    locationStr: 'Birmingham, UK',
    conditions: ['RRMS · 8 months in'],
    systems: ['Apple Watch'],
    ledeEyebrow: 'Free · The Observer',
    ledeHero: 'Harlow — your first read.',
    ledeEm: 'Your watch has been keeping a notebook for you.',
    ledeBody:
      'Seven days. No conclusions yet. Only what your watch has noticed about how you slept, how you woke, and where in the day your body asked for quiet.',
  },
  simone: {
    id: 'simone',
    name: 'Bella',
    age: 35,
    tier: 'Essential',
    archetype: 'The Pattern-Seeker',
    role: 'Freelance designer',
    locationStr: 'Austin, TX',
    conditions: ['POTS', 'suspected MCAS · 3 years searching'],
    systems: ['Oura', 'Apple Health', '2 calendars', 'cycle tracker'],
    ledeEyebrow: 'Essential · The Pattern-Seeker',
    ledeHero: 'Bella — fourteen nights with a shape.',
    ledeEm: 'You weren’t imagining it.',
    ledeBody:
      'Your body has been telling you this for fourteen nights — the same shape, the same hours. We have enough to call it a pattern. Below is the evidence.',
  },
  renee: {
    id: 'renee',
    name: 'Grayson',
    age: 47,
    tier: 'Pro',
    archetype: 'The Complex Human',
    role: 'Nonprofit CEO · 4 kids · frequent flyer',
    locationStr: 'Washington D.C. → Geneva (Tuesday)',
    conditions: ['RRMS', 'MCAS', 'ADHD', 'hypothyroidism'],
    systems: [
      'Oura Ring',
      'Apple Watch Ultra',
      'Withings BP + Body+',
      'Apple Health',
      'Outlook (work)',
      'Google Calendar (board)',
      'iCloud (family)',
      'Care-team calendar',
      'Gmail + Outlook',
      'TripIt + United + Lufthansa + UA Club',
      'Climate + barometric (Tomorrow.io)',
      'iMessage / SMS volume',
      'Specialist EHR (×6)',
      'Service dog vet portal',
    ],
    ledeEyebrow: 'Pro · The Complex Human',
    ledeHero: 'Grayson — Sunday evening read.',
    ledeEm: 'Thursday is asking for a decision.',
    ledeBody:
      'Across the indexed history of your last fourteen comparable weeks, Thursday carries an 81% probability of a significant neurological event if no change is made now. Two protocols are queued.',
  },
};

export const DEFAULT_PERSONA: PersonaId = 'renee';
