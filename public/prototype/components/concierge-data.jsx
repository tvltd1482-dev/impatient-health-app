// Appointment Concierge — the pre/during/post protocol surface.
// Anchor: bloodwork (universal, simple). Library: 5 most common appointment types.
// Plus: emergency / urgent-care protocol (auto-record, ICE contacts, discharge note request).

const CONCIERGE_LIBRARY = {
  // Anchored example — fully built end-to-end
  bloodwork: {
    id: "bloodwork",
    label: "Bloodwork / lab draw",
    icon: "drop",
    desc: "Universal. The simplest. The one most often missed in the follow-through chain.",
    duration: "15–30 min",
    typical: ["fasting CMP", "thyroid panel", "lipid panel", "specialist orders (TSH, IgE, vit D)"],
  },
  checkup: {
    id: "checkup",
    label: "Routine check-up",
    icon: "stethoscope",
    desc: "Annual physical, follow-ups with PCP or specialist. Lowest acuity, highest stakes for missed-question follow-through.",
    duration: "20–45 min",
    typical: ["GP physical", "specialist quarterly", "med adjustment review"],
  },
  scan: {
    id: "scan",
    label: "Scan (MRI / CT / ultrasound)",
    icon: "scan",
    desc: "Pre-anxiety load is the dominant signal class. Open-bore alternatives, contrast prep, claustrophobia history all live here.",
    duration: "30–90 min",
    typical: ["brain MRI w/o contrast", "abdominal CT", "ultrasound"],
  },
  infusion: {
    id: "infusion",
    label: "Day-unit infusion / radiation",
    icon: "iv",
    desc: "Multi-hour. Recovery protocol matters as much as the appointment. Includes radiation, dialysis, IV vitamin protocols.",
    duration: "2–6 hr",
    typical: ["IV vitamin (Grayson, Tue)", "iron infusion", "biologic therapy", "outpatient dialysis"],
  },
  procedure: {
    id: "procedure",
    label: "Outpatient procedure",
    icon: "procedure",
    desc: "Same-day surgery, biopsy, scope. Includes consent capture, fasting, transport home, post-procedure watch-list.",
    duration: "1–4 hr (+ recovery)",
    typical: ["endoscopy", "biopsy", "minor surgery", "lumbar puncture"],
  },
};

const CONCIERGE_DATA = {
  // Anchored: Grayson's Tuesday vitamin infusion + Wed bloodwork pair
  // (We anchor on the bloodwork specifically since the user picked it; it's the one
  //  closest to "every patient, any tier" — Harlow could have this view tomorrow.)
  renee: {
    upcoming: [
      {
        id: "appt-blood",
        type: "bloodwork",
        when: "Wed · 07:30",
        whenDetail: "Quest Diagnostics · Massachusetts Ave · 0.4mi",
        provider: "Dr. Imani Marsh · neurologist (ordering)",
        providerEmail: "imarsh@gwneuro.org",
        status: "pre",
        order: "CMP, CBC w/ diff, TSH+free T4, vitamin D, IgE total, hsCRP, ferritin",
        fasting: true,
        duration: "20 min",
      },
      {
        id: "appt-infusion",
        type: "infusion",
        when: "Tue · 14:00",
        whenDetail: "Dr. Marsh's clinic · Ross Hall · 1.8mi",
        provider: "Dr. Imani Marsh · neurologist",
        providerEmail: "imarsh@gwneuro.org",
        status: "pre",
        order: "IV vitamin protocol · pre-Geneva",
        duration: "3h",
      },
    ],
    // Bloodwork — full protocol
    bloodworkFull: {
      preHeads: {
        title: "Pre-visit · 36h before",
        sub: "Wednesday morning · 07:30 · Quest Diagnostics",
        bodyRead: {
          headline: "Your body is already in pre-visit mode.",
          detail: "HRV is −9ms vs your 30-day average. Resting HR up 4 bpm. Sleep onset has crept 47 minutes later for two nights. None of this is alarming. It is consistent with the read we have for you across 11 prior visits in this series.",
          markers: [
            { label: "HRV", value: "27ms", baseline: "36ms", delta: "−9ms" },
            { label: "Resting HR", value: "84", baseline: "80", delta: "+4 bpm" },
            { label: "Sleep onset", value: "00:14", baseline: "23:27", delta: "+47 min" },
          ],
        },
        agentNote: {
          to: "Dr. Marsh",
          subject: "Grayson A. — pre-visit context (Wed 07:30 lab)",
          status: "drafted · awaiting your approval to send",
          body: `Dr. Marsh —

Heads-up only, not a clinical concern: Grayson's biometric trace ahead of Wednesday's draw is consistent with anticipatory stress (HRV −9ms, RHR +4, sleep onset +47min over 36h). Pattern matches her prior 11 visits in this series, including the two where the in-room read disagreed with the wearable read.

This is the standard iMpatient pre-visit courtesy note. No action requested. Sharing so the in-room reading is interpretable in context.

— iMpatient (on Grayson's behalf · standing consent · revocable here: imp.at/r/marsh)`,
        },
        fasting: {
          start: "Tue 19:30",
          end: "Wed 07:30",
          calendarHold: true,
          reminders: [
            { when: "Tue 18:00", text: "Last food window opens. Tonight's protein bar OK." },
            { when: "Tue 19:30", text: "Fasting begins. Water + black coffee OK." },
            { when: "Wed 06:30", text: "Leave in 20m. Hydrate (16oz water before draw helps the stick)." },
          ],
        },
        carry: [
          { item: "Insurance card · BCBS PPO", status: "in wallet" },
          { item: "Lab order · Dr. Marsh, e-faxed Mon", status: "Quest has it" },
          { item: "Service-dog ID · for Bran", status: "in your bag" },
          { item: "Hydration · 16oz water", status: "reminder set 06:00" },
        ],
        userBrief: {
          title: "Three things you wanted to remember",
          items: [
            { tag: "for the phlebotomist", text: "Left arm only. Right has the PICC scar tissue from October — last draw blew the vein." },
            { tag: "for Dr. Marsh's review", text: "You wrote on Tuesday: 'morning numbness · index + middle finger · left hand · 4 of last 7 days, 06:00–08:00 only.' This is in the file, but you want to see it raised explicitly when results come back." },
            { tag: "for yourself", text: "Last vitamin D was 24. The Geneva trip + winter is real. If today's is below 30, the protocol calls for a re-infusion this week, not next." },
          ],
        },
      },
      during: {
        title: "During · what your body is reading",
        sub: "Surfaces on phone lock-screen the moment you arrive at Quest. Glanceable. The doctor can see it if you choose to share.",
        liveRead: {
          headline: "This is the room, not you.",
          detail: "Your HR is +18 bpm above your baseline for this hour. HRV has dropped 11ms in the last 6 minutes. This is well-documented anticipatory response — your body has done this at every one of the last 11 lab visits.",
          tone: "Your numbers from Tuesday are still true. The phlebotomist will not see them. You don't have to perform calm — you just have to be honest.",
          metrics: [
            { label: "Current HR", value: "102", state: "alert", note: "your at-rest baseline this hour: 84" },
            { label: "Current HRV", value: "21ms", state: "alert", note: "down from 32ms at home this morning" },
            { label: "BP (last reading)", value: "138/89", state: "warn", note: "pre-visit Withings · 22min ago" },
            { label: "Cortisol proxy", value: "high", state: "alert", note: "skin-conductance + voice-stress" },
          ],
        },
        ambientRecording: {
          enabled: true,
          consent: "Both-parties consent · on-device only · 15-min ring buffer",
          status: "recording · arrived 07:24",
          note: "Audio never leaves your phone. The transcript stays local until you approve sharing. The phlebotomist has been notified per state law.",
        },
        prompts: [
          { tag: "if you forget what you came in with", text: "Three things you wanted: the left-arm note, the morning-numbness flag, the vitamin D threshold (30 ng/mL)." },
          { tag: "if asked 'how are you'", text: "You can say: 'My wearable is reading anxious, but I'm physically OK. The pre-visit note went to Dr. Marsh.'" },
          { tag: "if it gets hard", text: "Tap once to play your own voice memo from Sunday. You sound calm. You wrote yourself the script." },
        ],
      },
      post: {
        title: "Post · what the agent does for the next 7 days",
        sub: "From the moment you walk out of Quest until every loop is closed.",
        immediate: {
          title: "Hour 0 · while you're still in the parking lot",
          steps: [
            { t: "+0 min", text: "Recording ended. 14m 22s captured. On-device transcript ready.", status: "done" },
            { t: "+2 min", text: "Wellbeing check: hydration reminder (16oz now), suggested protein within 90min.", status: "done" },
            { t: "+4 min", text: "Quest's confirmation email arrived. Sample IDs logged. Expected results: 24–48h.", status: "done" },
            { t: "+6 min", text: "Calendar: dropped 'await results' marker on Friday 07:30 (auto-clears when results land).", status: "done" },
          ],
        },
        openLoops: {
          title: "Open loops · what the agent is watching for you",
          sub: "Nothing falls off until it's closed. You don't have to remember any of these — but you can see them all.",
          rows: [
            {
              what: "Lab results arriving (Quest → Dr. Marsh portal)",
              owner: "agent",
              eta: "Thu evening or Fri AM",
              action: "Will read inbound email, parse PDF, structure findings, flag any value outside Grayson's personal range. Auto-message to Dr. Marsh with summary if vitamin D < 30 or hsCRP > 3.0 (per protocol you set in March).",
              state: "watching",
            },
            {
              what: "Vitamin D follow-up infusion (conditional)",
              owner: "agent",
              eta: "If D < 30 → book Fri 16:00 with Dr. Marsh's clinic",
              action: "Pre-checked: Friday 16:00 has a slot. Bran's vet is at 14:00 same day, 1.2mi away — schedule fits. If results trigger, agent will book and send you a one-tap confirmation before holding it.",
              state: "conditional",
            },
            {
              what: "MRI follow-up (Dr. Marsh mentioned 'maybe next month' Tuesday)",
              owner: "agent",
              eta: "Awaiting order from Dr. Marsh's office",
              action: "Drafting the chase-message for you to approve if no order arrives by Mon. Your preferred imaging: Open-bore Siemens at GW Hospital (you do not tolerate the closed bore — flagged in your file since 2023).",
              state: "awaiting external",
            },
            {
              what: "Prescription pickup — methylprednisolone (if labs trigger taper)",
              owner: "agent",
              eta: "Conditional on results",
              action: "Walgreens at 4815 MacArthur is on your route home Friday. Will be added to calendar 17:30 if prescription is e-sent.",
              state: "conditional",
            },
            {
              what: "The morning-numbness question — was it raised?",
              owner: "agent",
              eta: "Auto-checked once dictation/notes arrive",
              action: "Cross-references today's visit transcript + Dr. Marsh's notes against the brief you brought in. If the morning-numbness item is not addressed in clinical notes, drafts a follow-up message to Dr. Marsh's office for your approval.",
              state: "watching",
            },
            {
              what: "Pre-Geneva paperwork (international medical card)",
              owner: "agent",
              eta: "Mon",
              action: "Already drafted. Awaiting your approval. Will be filed with travel insurance and a copy emailed to Philippa.",
              state: "drafted",
            },
            {
              what: "Wellbeing — emotional check-in",
              owner: "you · agent reminds",
              eta: "Wed evening",
              action: "Soft prompt: 'How did this morning land? One word.' Logged to your file. Not shared unless you say so.",
              state: "scheduled",
            },
          ],
        },
        summary: {
          patient: {
            title: "What happened today (in plain language)",
            body: "You had blood drawn at 07:34. It went well. The phlebotomist used your left arm as you asked. Seven panels were ordered: a metabolic panel, a blood count with differential, thyroid (TSH and free T4), vitamin D, total IgE, hsCRP, and ferritin. Results are expected Thursday evening or Friday morning. Dr. Marsh will see them before you do. We will tell you the moment they arrive.\n\nYour body did what it always does in clinical settings — heart rate up, HRV down. That's not a complication. It's a consistent feature of your file across 11 prior visits, and we wrote it down so the doctor can see it for what it is.\n\nNothing about today asks anything more of you. The next thing you need to think about is fluids and food in the next 90 minutes.",
          },
          structured: {
            title: "Care plan",
            sections: [
              { name: "Medications", items: ["No changes ordered today.", "Methylprednisolone taper held in reserve pending vit D + hsCRP."] },
              { name: "Follow-ups", items: ["Lab results review with Dr. Marsh — auto-scheduled Mon 16:00 if results land Thu/Fri.", "MRI order watch — chase Mon if not received."] },
              { name: "Tests ordered", items: ["7-panel bloodwork drawn today (Quest #Q-148-2901-44).", "Possible vit D re-infusion (conditional)."] },
              { name: "Watch-fors (next 7d)", items: ["Worsening morning numbness · log the time + duration.", "New paresthesia · same.", "Headaches > 4 hours · same.", "Anything that scares you · message Dr. Marsh's office directly."] },
            ],
          },
          wellbeing: {
            title: "Wellbeing protocol",
            now: "Hydrate (16oz water in next 30 min). Protein within 90 min — there's a Larabar in your bag.",
            today: "Light day. The infusion is tomorrow afternoon — body is already saving for it. Cancel anything optional that's not Aria.",
            tomorrow: "Pre-infusion hydration begins 06:00. Bran's vet 14:00, infusion 14:00 — agent will rebook the vet to Thu if you'd rather not stack them.",
            week: "Geneva packing list arriving Sunday. Philippa briefed. The hotel switch is held provisionally until you approve.",
          },
        },
      },
      doctorSide: {
        // The mirror view — same data, doctor framing
        recipient: "Dr. Imani Marsh, MD · GW Neurology",
        format: "iMpatient pre-visit briefing · standing consent",
        sentAt: "Mon 21:14",
        readAt: "Tue 06:48 (read)",
        sections: [
          {
            heading: "What Grayson is bringing in",
            body: "Grayson has Wednesday's draw at Quest 07:30. Three items she wrote down between Tuesday and Sunday she wants raised when results return:",
            items: [
              "Morning numbness, left index + middle finger, 06:00–08:00 only, 4 of last 7 days. Onset since last visit.",
              "Vitamin D was 24 in October. She is asking that if today's is < 30, infusion be scheduled this week (pre-Geneva), not next.",
              "Left arm only for draw — October PICC scar tissue blew the right vein.",
            ],
          },
          {
            heading: "Wearable trace · last 14d",
            body: "Compound risk profile is at her personal-threshold ceiling. iMpatient's Thursday flare prediction stands at 0.81 (96h window). The pre-Geneva protocol is staged — hotel swap held, two infusions scheduled, sleep window protected.",
            items: [
              "HRV: 26ms · −16ms vs 30d baseline · approaching her relapse threshold.",
              "RHR: 84 · +13 bpm · MCAS pre-flare signature.",
              "Sleep deficit: −6h12m rolling 7d · architecture compromised since Wed.",
              "Cognitive load: 92/100 · 9 days above her personal threshold.",
            ],
          },
          {
            heading: "Anticipatory pattern (interpretability note)",
            body: "Grayson's in-room HR + BP at lab visits run 18–24% above her at-rest read across 11 prior visits in this series. Today's pre-visit data is consistent with that historical pattern, not an acute escalation. We share this so the in-room reading is interpretable in context — it is not a request for action.",
          },
          {
            heading: "What Grayson is asking from you",
            body: "Nothing additional in this visit. She wants you to see this brief before her sample arrives so the results conversation Monday can be focused.",
          },
        ],
        cta: "Reply to the briefing — or open Grayson's full file (read-only, last 14d).",
      },
    },
  },
};

// Emergency / urgent-care protocol — auto-triggered by location class
const EMERGENCY_PROTOCOL = {
  trigger: "Location class detected: Emergency Department (geofenced) · admitted-patient signature on Apple Health",
  triggeredAt: "06:43 · 2.4hr ago",
  facility: "GW University Hospital · ED · 900 23rd St NW",
  status: "active",
  steps: [
    {
      t: "+0s",
      title: "Continuous ambient recording started",
      detail: "Both-parties-consent jurisdictions · on-device only · 4-hour ring buffer · auto-extend on activity",
      status: "running",
    },
    {
      t: "+12s",
      title: "ICE contacts notified",
      detail: "Philippa A. (spouse) · SMS + call · acknowledged 06:44. Dr. Marsh's after-hours line · paged · acknowledged 06:51.",
      status: "done",
      who: ["Philippa A.", "Dr. Marsh (after-hours)"],
    },
    {
      t: "+30s",
      title: "Email sent to nominated physicians",
      detail: "Dr. Marsh (neuro), Dr. Okafor (endo), Dr. Patel (allergy/MCAS) — informed Grayson is in ED, full file made available read-only for the next 72h.",
      status: "done",
    },
    {
      t: "+1m",
      title: "Medical-summary card surfaced for ED staff",
      detail: "Active diagnoses (4), current meds (9), allergies (penicillin, sulfa), MCAS triggers, recent labs (Oct 14), service-dog (Bran) handling instructions. QR code on lock-screen for triage to scan.",
      status: "running",
    },
    {
      t: "+2m",
      title: "Discharge-notes request queued",
      detail: "Formal request drafted for ED charge nurse: discharge summary + any medications administered + any imaging performed. Will send when admission confirmed.",
      status: "queued",
    },
    {
      t: "+ongoing",
      title: "Vitals tracked continuously",
      detail: "Wearable read every 30s. Notable change >2σ from her baseline triggers a push to Philippa.",
      status: "running",
    },
    {
      t: "post-discharge",
      title: "Daily follow-through (next 14d)",
      detail: "Med pickups, follow-up visit booking, fasted bloodwork if ordered, watch-list pinging, and the wellbeing protocol (sleep, hydration, emotional check-in) — all on the agent.",
      status: "scheduled",
    },
  ],
  iceContacts: [
    { name: "Philippa A.", relation: "spouse · primary", phone: "+1 ••• ••62", status: "acknowledged 06:44" },
    { name: "Maren A.", relation: "sister · secondary", phone: "+1 ••• ••08", status: "informed (silent · per protocol)" },
  ],
  physicians: [
    { name: "Dr. Imani Marsh", role: "Neurology · primary", emailed: true, paged: true },
    { name: "Dr. Adaeze Okafor", role: "Endocrinology", emailed: true, paged: false },
    { name: "Dr. Sanjay Patel", role: "Allergy / MCAS", emailed: true, paged: false },
  ],
};

window.CONCIERGE_LIBRARY = CONCIERGE_LIBRARY;
window.CONCIERGE_DATA = CONCIERGE_DATA;
window.EMERGENCY_PROTOCOL = EMERGENCY_PROTOCOL;
