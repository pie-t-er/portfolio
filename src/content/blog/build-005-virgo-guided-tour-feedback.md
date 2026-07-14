---
title: "Build Log #005: Building a Guided Tour and a Feedback Loop"
date: 2026-07-02
type: build-log
tags: [meta, virgo, onboarding, ux, bug-report]
stack: [React, FastAPI, GitHub API]
project: virgo
summary: Shipped a ten-step spotlight walkthrough and an in-chat bug-report button that files straight to GitHub Issues
---

I spent this last week going through all of my portfolio pieces and adding three things:

- **Startup walkthrough.** On app startup (demo reset or otherwise), a tutorial highlights major app features for the user to use. A spotlight engine (`TutorialOverlay`) dims four panels around a transparent cutout and positions a tooltip above or below the target element via `getBoundingClientRect`; if a target is missing, it falls back to a centered tooltip with no spotlight rather than breaking. Ten steps walk a new user across Chat → Wardrobe → Calendar, gated by a `virgo_tutorial_shown` flag in `sessionStorage` so it only fires once per session.
- **Per-page help tooltip.** A floating "?" button fixed to the bottom-right on every non-Settings tab, each page exporting its own tutorial steps.
- **Feedback form.** A floating "⚑" button fixed next to the help button on every page that expands to a feedback form, so any user can submit a Github issue as they see bugs and user insight. `BugReportModal` — a bug/UX/insight type picker plus a description field — posts to `/api/report`, which stores the report in a `bug_reports` collection *and* opens a GitHub issue directly via a fine-grained PAT, handing back the issue URL.

I had gotten these ideas when I offered the demo to my sister, who on first interacting with the demo complained that she "didn't know how to use the app." I'm not sure if she was referring to my demeanor as a test administrator or the app itself, but I took it that the app didn't explain itself out the box, and would need some instruction for a beginner. Since I can't be physically with all of my users as they demo my deployed app on the internet, I built the tutorial into the app. That way anybody can understand what the app is capable of without having to pore through these build logs or god forbid, the code itself. The entire walkthrough is optional, and the user can always skip the tutorial should they please.

The per-page help page is largely the same as the walkthrough, but the user has to activate the help tooltip for it to show. I'm a big fan of the feedback button as well, because now my users can directly give me feedback on my deployed demo. This enables real user feedback, which can begin to further inform my development on this project.

The walkthrough was supposed to fire automatically the moment onboarding completed. It sometimes didn't, the trigger call landed in the wrong spot relative to React's commit cycle and silently no-op'd instead of erroring, which made it easy to miss. This was fixed with a `tutorialPending` state plus a `useEffect` that sequences activation correctly after the commit. Returning users (profile already has a gender set) still get the walkthrough once if `virgo_tutorial_shown` is absent, and `?fresh=1` clears that flag so demos always see the full walkthrough regardless of what the browser remembers.

Gating the walkthrough on `sessionStorage` rather than a persistent per-user flag was a direct consequence of not having auth yet, there's no per-user record to attach a "seen it" flag to, so session-scoped is the only correct scope available right now. That'll need revisiting once OAuth lands, per the [case study](virgo)'s future backlog.

Help system and feedback loop are both shipping and correctly triggering. The logical next step is to start setting up OAuth, but I'm in no rush to do that. It probably won't happen for more than a month since I'll be at camp.
