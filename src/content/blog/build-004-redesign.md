---
title: "Build Log #004: The Redesign"
date: 2026-06-30
type: build-log
tags: [meta, design, portfolio, css]
stack: [Astro, Tailwind CSS]
project: portfolio
summary: Spent a week restyling the whole site into a dark, coherent, personality-forward frontend.
---

## What I set out to do

Even though the homepage had my headshot on it, the portfolio still didn't **feel** like it represented me. I wanted a better color scheme, a dark-native aesthetic, unique fonts, and more personality accents throughout the site.

I wanted to personalize the site to my own aesthetic without losing the professional presence it needs for a job search. That meant a full pass on the visual layer (color, type, layout rhythm) with no changes to the content model or backend. Design, not engineering.

## What was built

Landed on a dark, editorial palette and formalized it into an actual design pack before touching component code, so the implementation phase was mostly execution rather than exploration. Updated CSS across the board, picked accent colors, and got the whole site speaking one visual language instead of whatever the CRA-era leftovers were doing.

This phase was less engineering than feel; a lot of eyeballing color combinations and spacing until it read right, not a lot of architecture. The one real bug was the sticky navbar sitting awkwardly on-scroll, which took some debugging but wasn't a deep issue.

Getting the hero headshot to sit right took longer than it had any right to. I pulled the background out in Affinity Photo, then it became a game of eyeballing Tailwind classes until the sizing behaved dynamically across the layout instead of looking pasted on:

```html
<div class="hidden sm:block shrink-0 self-end">
  <img
    src="/headshot/DSC09519.png"
    alt="Pieter Alley"
    class="block h-[480px] w-auto select-none pointer-events-none"
    draggable="false"
  />
</div>
```

`h-[480px] w-auto` fixed to the container's bottom edge is what finally made it look intentional instead of floating.

## Next up

Genuinely happy with this one. The site looks sleek, polished, and dark-native in a way it didn't a week ago. Really low effort phase of development for a real upgrade in cosmetics.

Now I plan on making the site work as a mobile business card; something you can scan off a QR code or drop into a bio link and have it behave like a quick-hit landing page, linktree-style, instead of a shrunk-down desktop layout.
