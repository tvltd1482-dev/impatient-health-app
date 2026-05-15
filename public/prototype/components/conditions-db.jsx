/* eslint-disable no-undef */
/* Conditions database — the iMpatient-voice glossary.
   Every condition that appears in the product is defined here, in our
   own words, with the lived experience first.

   Two consumers:
     - <ConditionTerm term="POTS">POTS</ConditionTerm> — explicit wrap
     - <ConditionsText>{copy}</ConditionsText>     — auto-detect in body text

   The popover is calm, not encyclopedic. Every entry has:
     id        — canonical key
     label     — display name
     full      — full medical name (e.g. "Postural orthostatic tachycardia syndrome")
     short     — one-line lived-experience read (the headline)
     body      — 1–2 paragraphs, plain language
     signals   — what iMpatient watches for, when present
     prevalence— sometimes-known epidemiology line, optional
     learn     — anchor for the future Conditions Library page
     aliases   — other strings that should auto-detect to this entry

   Voice rules:
     - Lead with what it feels like, not the textbook definition.
     - "Borrowed legs" before "post-exertional fatigue."
     - Specific. Honest. Calm.
     - Never frame as a deficit. Frame as a body that is doing something
       very specific that the world hasn't been measuring.
*/

const CONDITIONS_DB = {
  pots: {
    id: "pots",
    label: "POTS",
    full: "Postural orthostatic tachycardia syndrome",
    short: "Your heart climbs faster than it should when you stand up.",
    body: [
      "POTS is a form of dysautonomia — your autonomic nervous system has trouble regulating blood flow against gravity. When you stand up, your heart rate jumps 30+ beats within ten minutes (40+ if you're younger), trying to push blood back to your brain. The world goes grey at the edges. You feel hot, then cold. You sit back down.",
      "It is not anxiety. It is not deconditioning. It is a real, measurable circulatory response — and it is exhausting because your body is running a subtle marathon every time you stand for too long.",
    ],
    signals: [
      "Resting HR climbing through the day, especially after standing blocks",
      "HRV dropping after standing >5h",
      "Symptoms worse on hot, humid, or low-pressure days",
    ],
    prevalence: "1–3 million Americans · 80%+ are women aged 15–50",
    aliases: ["postural orthostatic tachycardia syndrome", "postural tachycardia"],
  },

  mcas: {
    id: "mcas",
    label: "MCAS",
    full: "Mast cell activation syndrome",
    short: "Your immune system is set on a hair-trigger.",
    body: [
      "Mast cells are sentry cells — they release histamine and other chemicals when they detect a threat. In MCAS, they fire when there is no real threat: a temperature swing, a perfume, a specific food, the pressure dropping before a storm. The reactions are real and measurable, but the triggers are everywhere.",
      "It can look like flushing, hives, GI distress, brain fog, low blood pressure, or full anaphylaxis. The hardest part is the unpredictability — last week's safe lunch is this week's reaction. iMpatient looks for the environmental signature behind each one.",
    ],
    signals: [
      "Symptoms after barometric pressure drops > 12mb",
      "Hives, flushing, or GI events clustering around new locations",
      "Reactions worse during cycle phases or hormonal shifts",
    ],
    aliases: ["mast cell activation syndrome", "mast cell activation"],
  },

  rrms: {
    id: "rrms",
    label: "RRMS",
    full: "Relapsing-remitting multiple sclerosis",
    short: "An autoimmune condition where your immune system attacks the protective coating around your nerves.",
    body: [
      "In RRMS, the most common form of MS, attacks come in episodes (relapses) followed by partial or full recovery (remissions). Symptoms vary — fatigue, vision changes, numbness, balance, cognitive load. They depend on which nerves were affected this time.",
      "Heat is a known amplifier. Stress is a known amplifier. Sleep deficit is a known amplifier. iMpatient watches for the pre-relapse signature in your data — the quiet shift in HRV and sleep architecture that often precedes a relapse by days.",
    ],
    signals: [
      "HRV decline over 7–14 days alongside accumulating sleep deficit",
      "Heat exposure during high cognitive-load weeks",
      "Symptom flare-ups clustering around hormonal cycle phases",
    ],
    prevalence: "~1 million Americans · 85% of MS diagnoses are RRMS",
    aliases: ["relapsing remitting ms", "relapsing-remitting", "relapsing remitting multiple sclerosis"],
  },

  ms: {
    id: "ms",
    label: "MS",
    full: "Multiple sclerosis",
    short: "An autoimmune condition affecting the central nervous system.",
    body: [
      "MS happens when your immune system attacks myelin — the protective coating around your nerves. Without it, signals between brain and body slow, distort, or fail. Symptoms depend on which nerves are affected: fatigue, vision, balance, cognition, sensation.",
      "Most MS is the relapsing-remitting form (RRMS). iMpatient pays particular attention to the slow, accumulating signals that precede a relapse — sleep architecture, HRV decline, and the convergence of known amplifiers (heat, stress, hormonal phase).",
    ],
    signals: [
      "Compounding HRV decline over 7+ days",
      "Heat-day clustering",
      "Cognitive load above personal threshold",
    ],
    aliases: ["multiple sclerosis"],
  },

  dysautonomia: {
    id: "dysautonomia",
    label: "dysautonomia",
    full: "Dysautonomia",
    short: "An umbrella term for conditions where the autonomic nervous system mis-regulates.",
    body: [
      "Your autonomic nervous system runs everything you don't think about: heart rate, blood pressure, digestion, temperature, pupil response. In dysautonomia, one or more of those threads is mis-tuned. POTS is one form. Inappropriate sinus tachycardia is another. Pure autonomic failure is another.",
      "What unites them is that the body is making real, measurable adjustments — they're just often the wrong ones for the situation. iMpatient was built primarily for the dysautonomia population because the signature shows up beautifully in continuous biometrics.",
    ],
    signals: [
      "Resting HR drift",
      "HRV variability across positions",
      "Temperature regulation outliers",
    ],
    aliases: ["autonomic dysfunction"],
  },

  raynauds: {
    id: "raynauds",
    label: "Raynaud's",
    full: "Raynaud's phenomenon",
    short: "Your small blood vessels over-react to cold or stress.",
    body: [
      "When you're cold, or sometimes just stressed, your fingers and toes go white, then blue, then red as the blood comes back. It happens because the vessels in your extremities clamp down too aggressively, then release. It can be its own thing (primary Raynaud's) or part of a connective-tissue picture (secondary).",
      "Office HVAC, cold rain, holding a cold drink — all known triggers. iMpatient correlates Raynaud's events with environmental temperature drops and skin-temperature wearable readings to map your personal trigger threshold.",
    ],
    signals: [
      "Skin temp <12°C in extremities (when wearable supports it)",
      "Episodes clustering around cold-rain or HVAC environments",
      "Higher frequency during high-stress weeks",
    ],
    aliases: ["raynaud", "raynauds phenomenon", "raynaud's phenomenon"],
  },

  mecfs: {
    id: "mecfs",
    label: "ME/CFS",
    full: "Myalgic encephalomyelitis / chronic fatigue syndrome",
    short: "Exertion — physical, cognitive, emotional — costs you more than it returns.",
    body: [
      "The defining feature of ME/CFS is post-exertional malaise (PEM): symptoms get worse, often dramatically, 12–48 hours after activity that wouldn't have cost a healthy person anything. Your body's energy production is genuinely impaired at the cellular level. Pacing — staying inside an envelope you've identified — is the most evidence-based management strategy we have.",
      "iMpatient is designed to make pacing visible. It maps the size of your envelope from your own data, then warns when you're approaching the wall.",
    ],
    signals: [
      "PEM windows after activity peaks (12–72h lag)",
      "HRV that doesn't recover to baseline after sleep",
      "Cognitive load that compounds across days",
    ],
    aliases: ["chronic fatigue syndrome", "myalgic encephalomyelitis", "me-cfs", "cfs"],
  },

  longcovid: {
    id: "longcovid",
    label: "long COVID",
    full: "Post-acute sequelae of SARS-CoV-2 (PASC)",
    short: "Symptoms persisting weeks or months after the initial COVID-19 infection.",
    body: [
      "Long COVID is a constellation, not a single condition. It often overlaps with dysautonomia, ME/CFS, and MCAS — many long-haulers meet criteria for one or more. Symptoms include fatigue, brain fog, post-exertional malaise, heart-rate dysregulation, and immune reactivity.",
      "iMpatient treats long COVID as a multi-pattern surveillance problem. We watch the same continuous signals that flag POTS and ME/CFS, and we surface which signature is most active for you in any given week.",
    ],
    signals: [
      "POTS-like HR response to standing",
      "ME/CFS-like post-exertional patterns",
      "MCAS-like environmental reactivity",
    ],
    aliases: ["pasc", "post-covid syndrome", "post-acute covid"],
  },

  endometriosis: {
    id: "endometriosis",
    label: "endometriosis",
    full: "Endometriosis",
    short: "Tissue similar to the uterine lining grows where it shouldn't.",
    body: [
      "In endometriosis, tissue resembling the endometrium grows outside the uterus — on the ovaries, the bowel, the bladder, sometimes further afield. It bleeds with each cycle. The bleeding has nowhere to go, and so it inflames, scars, and binds tissue together. The pain is real, often severe, and on average takes 7–10 years to be diagnosed.",
      "iMpatient maps cycle phase against symptom intensity, so the patterns become visible to you and explainable to your doctor — without years of journaling.",
    ],
    signals: [
      "Symptom intensity tracking with cycle phase",
      "Sleep architecture changes in luteal phase",
      "Pain-day clustering",
    ],
    prevalence: "~1 in 10 women of reproductive age",
    aliases: [],
  },

  hypothyroidism: {
    id: "hypothyroidism",
    label: "hypothyroidism",
    full: "Hypothyroidism",
    short: "Your thyroid is producing less hormone than your body needs.",
    body: [
      "The thyroid sets the metabolic tempo of your body. When it underproduces, everything slows: heart rate, digestion, body temperature, cognitive speed. The diagnosis is usually a clean lab read (TSH + free T4), and management is usually replacement (levothyroxine), but the lived experience around medication adjustments can be subtle.",
      "iMpatient watches the basal metrics — RHR, body temperature, sleep need — that often shift before a lab does.",
    ],
    signals: [
      "Lower-than-baseline RHR",
      "Body temperature drift",
      "Sleep duration creeping up",
    ],
    aliases: ["underactive thyroid"],
  },

  adhd: {
    id: "adhd",
    label: "ADHD",
    full: "Attention-deficit / hyperactivity disorder",
    short: "Your attention system runs on a different signal-to-noise ratio.",
    body: [
      "ADHD is not a deficit of attention — it is a difficulty *regulating* attention. The interesting absorbs you completely; the boring repels you completely; the in-between blurs. It shows up across the lifespan and is highly co-morbid with autoimmune conditions, dysautonomia, and chronic-pain populations.",
      "We include it because medication timing, sleep architecture, and cognitive load patterns all matter for ADHD readers — and they show up in the same continuous data we already watch.",
    ],
    signals: [
      "Sleep onset latency (delayed phase patterns)",
      "Cognitive load oscillations",
      "Medication adherence patterns",
    ],
    aliases: ["attention deficit hyperactivity disorder", "adhd"],
  },

  autoimmune: {
    id: "autoimmune",
    label: "autoimmune",
    full: "Autoimmune disease",
    short: "Your immune system mistakes part of your body for a threat.",
    body: [
      "Autoimmune conditions are an umbrella — lupus, RA, MS, Hashimoto's, type 1 diabetes, IBD, dozens more. What unites them is that your immune system is doing what it's supposed to do (find threats and destroy them) but pointed at the wrong target.",
      "Many autoimmune conditions cluster — having one raises the probability of a second. iMpatient was built with this in mind: the same continuous-signal infrastructure helps map flares across multiple co-occurring conditions.",
    ],
    signals: [
      "HRV decline preceding flare",
      "Sleep architecture compromise",
      "Inflammatory marker patterns (when labs are connected)",
    ],
    aliases: ["autoimmune disease", "autoimmune disorder"],
  },
};

// Build the alias map once — every alias points to its canonical entry.
const CONDITIONS_ALIAS_MAP = (() => {
  const m = {};
  Object.values(CONDITIONS_DB).forEach(entry => {
    m[entry.label.toLowerCase()] = entry.id;
    (entry.aliases || []).forEach(a => { m[a.toLowerCase()] = entry.id; });
  });
  return m;
})();

// Sorted list of all matchable strings, longest first, so "RRMS" is
// matched before "MS" when scanning text.
const CONDITIONS_MATCH_LIST = Object.keys(CONDITIONS_ALIAS_MAP)
  .sort((a, b) => b.length - a.length);

Object.assign(window, { CONDITIONS_DB, CONDITIONS_ALIAS_MAP, CONDITIONS_MATCH_LIST });
