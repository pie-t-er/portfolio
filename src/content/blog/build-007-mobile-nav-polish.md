---
title: "Build Log #007: Mobile Blog and Nav Polish"
date: 2026-07-08
type: build-log
tags: [meta, mobile, portfolio, tailwind]
stack: [Astro, React, Tailwind CSS]
project: portfolio
summary: Made the blog truly mobile-friendly by fixing a frontend bug and adding padding to inner-pages using Tailwind breakpoints.
---

The mobile landing page dock had already been fixed, but everything else still wore its desktop layout on a phone.

## The Friction

I had recently changed the mobile landing page into a static full-viewport dock built on Tailwind breakpoints, so anyone arriving from a social media bio link gets somewhere useful immediately. Read more about those changes in [Build Log #004](/blog/build-005-mobile-dock). Those changes had made the landing page a much smoother experience, but did nothing for the rest of the mobile experience. The wrapped desktop navbar still persisted on non-landing pages so the UI was getting crowded by design we had already fixed. I also felt like there wasn't much padding on the mobile view and I knew Tailwind had breakpoints for this very purpose. I wanted to tailor the mobile experience to my blog.

The real cause was that `Navbar.astro` was trying to fit "Pieter Alley" plus four inline nav links on one row, and below roughly 430px wide that combination doesn't fit. It was forcing horizontal scroll on every inner page on the site.

## What was built

- **`Navbar.astro`**: added a `sm:hidden` hamburger button that opens a dropdown, styled to match the homepage's link-tree dock so mobile nav feels consistent across the site instead of like a bolted-on menu. Desktop nav is untouched, plain `<script>` toggle, no client framework pulled in for something this small.
- **Post layouts** (`CaseStudy`, `BuildLog`, `Essay`, `Archive.astro`): mobile horizontal padding was `px-4` while desktop was `px-6`, which read as cramped. Unified to `px-6` everywhere.
- **`BlogFeed.jsx` filter bar**: the desktop and mobile filter bar had been one layout trying to flex between both sizes. Split into two separate blocks gated by `sm:` instead of one that tries to do both jobs.
- **`BuildLogCard` / `ArchiveCard`**: dropped a fixed `w-28` date column that was eating the width the title and summary needed to wrap normally, and moved the date inline next to the project/type badge, matching how `CaseStudyCard` and `EssayCard` already did it.

## Two small layout bugs inside the filter bar fix

Splitting the filter bar into desktop/mobile blocks surfaced two more specific bugs once I looked at the mobile version on its own:

- The compact type-filter pills were sitting in a plain `flex` div, which stretches to fill its container width. Made `TypeFilterGroup` `inline-flex` so it shrink-wraps to its content instead. The block-level version had been leaving a blank bar where "Clear filters" used to sit.
- Tags were laid out in a CSS grid, and grid columns share a track width. Short tags were getting stretched to match whatever the longest tag in their column happened to be. Switched to distributing tags round-robin into three independent flex rows that scroll horizontally as a unit, so each tag only takes the width it needs.

"Clear filters" also moved onto its own line below the tags, since it had been one of the things pushing the page's horizontal scroll boundary out.

## Next up

The website finally looks coherent across platforms, and now just needs more content to show off. The portfolio blog is officially "good enough", and I'd like to focus on other works.

That being said, if I were to come back to improving this site, I would add a newsletter service that aggregates an RSS feed of my site into a weekly digest sent via email. It could also be cool to create an admin panel that shows traffic, helps me design and preview my posts while I write them rather than writing everything in raw markdown, and creates the opportunity for more analytics to share on the portfolio as appropriate. I have more pressing work to adhere to but these are some ideas of where my heads at with this blog.
