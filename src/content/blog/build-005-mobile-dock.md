---
title: "Build Log #005: Mobile Dock and the Linktree Landing"
date: 2026-07-01
type: build-log
tags: [meta, design, portfolio, mobile]
stack: [Astro, Tailwind CSS]
project: portfolio
summary: Turned the mobile homepage into a full-viewport quick-links dock.
---

I wanted to turn the mobile landing page into a Linktree-style quick-links dock, so anyone arriving from a social media bio link gets somewhere useful immediately.

## What was built

The homepage on mobile is now a static, full-viewport dock built entirely on Tailwind breakpoints. It puts the navbar links next to the live deployment links and social icons in one screen, so someone bouncing between my Instagram, this site, and a live demo doesn't have to think about it. It bridges my different social presences and points them at the blog and portfolio without extra taps.

The first pass at the dock was oversized for the viewport, and the original desktop navbar refused to get out of the way. It kept rendering on top of or alongside the new dock instead of yielding to it.

I simplified the dock design and suppressed the old navbar specifically on mobile for the homepage. That got it working but left the dock feeling cramped, so I went back and bumped up button and font sizes to actually use the whitespace I now had instead of leaving it empty.

I ended up merging the nav links and the live deployment links into a single list rather than visually separating them into two groups so I could recoup some much needed whitespace. The deployments still get a `↗` arrow so they read as "goes somewhere external," but there's no hard divider. It reads cleaner as one list than two short ones. This phase was scoped well enough that the whole plan was completed.

## Next up

The mobile landing page looks genuinely clean now. Everything *else* on the site still wears its desktop formatting outside of that one page; sticky top navbar, desktop-width layouts, the works.

Taking the mobile treatment past the landing page: padding out blog post body text so it doesn't feel cramped on a phone, and a newsletter signup that rounds up the week's posts. If I'm going to share posts over social media, the reading experience needs to hold up on the device people are actually reading it on.
