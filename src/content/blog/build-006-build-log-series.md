---
title: "Build Log #006: Linking Build Logs and Case Studies"
date: 2026-07-03
type: build-log
tags: [meta, astro, portfolio, content-model]
stack: [Astro, TypeScript, Zod, Tailwind CSS]
project: portfolio
summary: Turned build logs into per-project series cross-linked with their case study, then rewrote the footer.
---

This backlog item had been sitting since the redesign: case studies and their build logs lived in the same content collection but never referenced each other, and there was an open question about whether build logs should be numbered per-project or globally.

## What was built

- Schema: made `project` required on `build-log` (a build log without one is just an essay) and added it as optional on `case-study`.
- `src/lib/series.ts`: one function, `getBuildLogSeries(project)`, fetches all build logs plus the matching case study for a project slug, sorted by date. Prev/next, whether a log is first or last, whether a case study exists — all derived from that at build time. No `next`/`prev` frontmatter to keep in sync by hand when a post gets inserted or reordered.
- `BuildLog.astro` got a footer with prev/next arrows through the series and a link to the project's case study; `CaseStudy.astro` got the reverse — a chronological list of its build logs, brown-accented against the page's forest.

## Iterating on the footer

First pass had a "Log N of M" counter that read fine on its own, but the "All build log entries" link at the bottom just dumped the reader on the unfiltered blog feed — essays, other projects, all of it, for zero benefit. Once that got flagged, the fix wasn't a smarter link, it was deleting the counter and the link entirely and letting the prev/next arrows carry series navigation on their own. The plain-text "Read the full case study" link grew into a full preview banner (title, summary, its own CTA) instead, since it's the one link in that footer actually doing work now.

## Settling the numbering question

I decided on separate, per-project numbering for the build logs; each project's build logs get their own `#001`, `#002`, ... sequence, with the project carried as a visible label rather than folded into the title text. That's what the file names already looked like before this entry ever tried to relitigate it, and now project build logs can be grouped more cleanly.

There were a lot of dead links on the placeholder blog posts that complicated a change like this, so I'm glad I tackled this issue before the build log got very long and cross references depended on more than just project name. I think it would be good to encode the numbering of the build logs somewhere into the data schema for posts but I don't foresee this being a massive issue.

## Next up

Fix the prevalent mobile front end bugs. Now that the mobile landing page is static, that resolves much of those UI worries. But the rest of the pages, and the text-focused posts need to display well on mobile, since this is also a good way for users to read my blog posts. Once those fixes are made, this blog will be truly cross-platform and mobile-friendly.
