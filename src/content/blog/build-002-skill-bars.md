---
title: "Build Log #002: Skill Bars"
date: 2026-05-25
type: build-log
tags: [meta, react, design, portfolio]
stack: [React, Tailwind CSS, Astro]
project: portfolio
summary: Replaced percentage bars with interlocking pentagon panels arranged in a zipper pattern driven entirely by blog post tags.
---

I replaced the original animated percentage bars with a pentagon zipper design. Each skill row is now filled with pentagonal panels driven entirely by the `stack` field in blog post frontmatter. No manual curation.

## The zipper geometry

The panel shape is a pentagon, upward panels point up and downward panels point down. The zipper interlock works by aligning the lower pentagon's upper-right edge with the upper pentagon's lower-left edge — both edges have the same slope (0.76 H/W), so they're parallel and can be made geometrically coincident at zero gap. These calculations were necessary for making the panels interlock with each other, in true zipper fashion.

Getting this right took several iterations. The key insight: upper panels sit at the top of the container (y = 0), so lower panels must be offset down by 62% of the panel height. This puts the lower tip exactly at the level of the upper pentagon's shoulders, and the upper tip exactly at the level of the lower pentagon's shoulders, forming an interlocking zone. With a gap G between panels, the upper pentagon shifts right by G/2 and the shared edges become parallel lines with uniform spacing.

## Panel behavior

Each panel is a link to the corresponding case study. Two projects (Happy Campers and Job Search Dashboard) have screenshot previews that show at 45% opacity at rest and full opacity on hover. Panels without screenshots show the project name at rest, then the name and tagline on hover.

Hovering triggers a reverberation effect across the row: the hovered panel scales to 1.18×, while immediate neighbours compress to 0.90×, then recover to 0.95×, then 0.98× back to rest. The compression makes the hovered panel feel like it's physically pushing its neighbours aside. You can see this effect play out by shifting hover effects between different panels, as you hover on a panel closer to another panel, the other panel shrinks until it's hovered on.

Panels entrance-animate on scroll via IntersectionObserver: each panel staggers in 300ms apart over a 950ms spring curve. It's rare for this effect to actually be observed, but it's a quick pop if anybody's ever paying attention to those details.

## Color

The panels are electric neon green (`#39FF14`) with a layered `drop-shadow` glow. The black section background makes the glow read properly.

## Data model

Skill groups (`src/data/skills.ts`) define categories and display order. Whether a skill shows up is determined by the number of posts, skills with only one project are filtered out (single panels don't show the zipper pattern and don't really say much about my proficiency in that skill). As more case studies are written, the bars fill in automatically.
