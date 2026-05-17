# ISSUE-015 · Privacy + Terms pages for App Store / Play submission

**Priority** P1 · **Owner** Lachlan · **Tool** Claude Code (local) + counsel for final copy

---

## Paste-ready prompt — Claude Code

```
The /privacy and /terms pages are already scaffolded with the aura-hero
pattern, a STUB banner, four sections each. Final copy must be drafted
and reviewed by counsel before May 30, 2026.

This prompt is for the team's pre-counsel content draft. Counsel revises;
team redeploys.

Tasks:

1. Update pages/privacy.tsx with draft content:

   Section: WHAT WE READ
   · Wearable streams (heart rate, HRV, sleep, activity) from Oura,
     Apple Watch, Withings, Garmin, Whoop, Fitbit, Dexcom, and similar
     consented devices.
   · Calendar events (titles and times only — not bodies/notes) from
     Apple, Google, Outlook, iCloud, separated by life domain.
   · Communication volume and timing only — never the text. Gmail,
     Outlook, iMessage/SMS, Slack: we count, we never read.
   · Weather and barometric pressure at your origin, your destination,
     and your stops in between (Tomorrow.io API).
   · Travel and clinical-setting metadata: flights, hotel check-ins,
     hospital/clinic location detections (with your permission).
   · The cost line items you explicitly log (out-of-pocket spend tied
     to your conditions).
   · Conversations you have with Coach. These are stored and used to
     improve the read we give you — they are never shared.

   Section: WHAT WE NEVER READ
   · The text of your messages, emails, or notes.
   · The audio or transcripts of your calls.
   · The content of any document not explicitly uploaded for processing.
   · Your raw GPS trail outside of clinical-setting detection windows.

   Section: WHERE IT LIVES
   · Your record is held in encrypted storage with us. You can export
     the full raw record at any time as a single zip.
   · The Travel Card is agent-fronted, time-bound, and key-controlled
     by you — recipients receive a short-lived URL or a QR code that
     resolves to a one-page summary; the full file never leaves us.
   · Mønk's inference runs on Anthropic's Claude models. Prompts and
     model outputs are subject to Anthropic's data policy (no training
     on customer data; zero-retention enterprise mode where applicable).

   Section: AGGREGATE INTELLIGENCE
   · Enterprise customers (employers, health systems) see anonymised
     population signal — aggregated at the source, never individual.
   · You can opt out of aggregation at any time. Default for individual
     accounts: opt-out.
   · Aggregate research contribution (NIH/Mayo-grade studies) is a
     separate opt-in toggle in Settings. Default: off.

   Section: YOUR CONTROLS
   · Toggle any source off; we forget that source's data within 30 days.
   · Delete your account: irreversible, completes within 30 days.
   · Export everything: raw JSON zip, ready in <2 minutes.
   · Contact privacy@impatient.app for any request.

2. Update pages/terms.tsx with draft content:

   Section: USE OF THE SERVICE
   · iMpatient is a behavioral-intelligence partner. It is not a
     medical device. It does not diagnose, treat, cure, or prevent any
     condition.
   · Coach is an aid for translating signals — it is never a substitute
     for clinical care.
   · You retain full authority over every decision about your body.

   Section: ACCOUNTS
   · Free / Essential / Pro / Enterprise. Each tier is a depth of
     integration and a depth of intelligence — never a withholding of
     dignity.
   · Free is forever. Cancel any paid tier at any time, no penalty.

   Section: LIMITATIONS
   · The engine reads patterns. It does not diagnose.
   · The engine is wrong sometimes. When it is, please tell us — your
     correction trains the read for next time.
   · We do not warrant that the service will be uninterrupted; we do
     warrant that we will tell you immediately when it isn't.

   Section: GOVERNING LAW
   · Delaware, USA. SymbAIo Inc., a Delaware C-corporation, a TELLER
     Ventures portfolio company. Disputes resolved per Delaware law.

3. Keep the STUB banner at the top of both pages until counsel signs off.
   Add a footer line: "Last reviewed by counsel: pending."
```

---

## Acceptance

- /privacy and /terms render the new content in aura-hero + sections
- STUB banner remains until counsel reviews
- Both URLs submittable to App Store Connect + Play Console
- Voice is plain, not legalese — example "We never read the text" wins over "We do not access the contents of your communications"
- App Store Connect privacy disclosures match this content
