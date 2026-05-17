import Head from 'next/head';
import PageShell from '../components/PageShell';
import PageHero from '../components/PageHero';

const GROUPS = [
  { eyebrow: 'Wearables',           rows: [
    { name: 'Oura Ring',           state: 'connected', since: 'Mar 14',  voice: 'HRV, RHR, sleep architecture.' },
    { name: 'Apple Watch Ultra',   state: 'connected', since: 'Jan 02',  voice: 'Continuous HR, activity, falls.' },
    { name: 'Withings BP + Body+', state: 'connected', since: 'Feb 22',  voice: 'Daily BP, body composition.' },
  ]},
  { eyebrow: 'Health records',      rows: [
    { name: 'Apple Health',        state: 'connected', since: 'Jan 02',  voice: 'Aggregated history vault.' },
    { name: 'Specialist EHR (×6)', state: 'connected', since: 'Apr 11',  voice: 'Lab values, visit notes, imaging.' },
  ]},
  { eyebrow: 'Calendars',           rows: [
    { name: 'Outlook · work',       state: 'connected', since: 'Jan 02', voice: 'Titles and times only. Never bodies.' },
    { name: 'Google · board',       state: 'connected', since: 'Jan 18', voice: 'Cognitive-load weighting.' },
    { name: 'iCloud · family',      state: 'connected', since: 'Feb 01', voice: 'Caregiver-mode signals.' },
    { name: 'Care-team calendar',   state: 'connected', since: 'Mar 03', voice: 'Visits, infusions, follow-ups.' },
  ]},
  { eyebrow: 'Communication',       rows: [
    { name: 'iMessage · SMS volume', state: 'connected', since: 'Feb 14', voice: 'Volume only. Never the text.' },
    { name: 'Gmail + Outlook',       state: 'connected', since: 'Jan 02', voice: 'After-hours pattern detection.' },
  ]},
  { eyebrow: 'Travel & environment', rows: [
    { name: 'TripIt + United + Lufthansa', state: 'connected', since: 'Mar 22', voice: 'Flights, delays, gate changes.' },
    { name: 'Tomorrow.io · barometric',    state: 'connected', since: 'Apr 11', voice: 'Pressure delta forecasting.' },
  ]},
  { eyebrow: 'Medical',             rows: [
    { name: 'Service dog vet portal', state: 'connected', since: 'Mar 02', voice: 'Vet schedule, vaccination tracking.' },
  ]},
];

export default function Integrations() {
  return (
    <>
      <Head><title>iMpatient · Integrations</title></Head>
      <PageShell current="/integrations" crumb="Integrations">
        <PageHero
          eyebrow="Sources · privacy first"
          title="Volume only. Timing only."
          emClause="Never the text."
          body="iMpatient reads when the world is asking a lot of you, not what it is asking. Toggle off any source at any time."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-stack)', marginTop: 'var(--gap-stack)' }}>
          {GROUPS.map((g) => (
            <section key={g.eyebrow} style={{ display: 'grid', gap: 'var(--gap-component)' }}>
              <div className="eyebrow">{g.eyebrow}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--gap-component)' }}>
                {g.rows.map((r) => (
                  <article key={r.name} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-base)', fontWeight: 600, color: 'var(--text-display)' }}>{r.name}</h3>
                      <span aria-hidden style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-glow)', boxShadow: '0 0 0 4px rgba(168,212,255,0.16)' }} />
                    </div>
                    <span className="caption">Reading since · {r.since}</span>
                    <p className="body-sm" style={{ marginTop: 'var(--space-1)' }}>{r.voice}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </PageShell>
    </>
  );
}
