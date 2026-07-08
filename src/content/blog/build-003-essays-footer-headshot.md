---
title: "Build Log #003: Essays, Footer Reveal, and Headshot"
date: 2026-05-26
type: build-log
tags: [meta, astro, design, portfolio]
stack: [Astro, React, Tailwind CSS]
project: portfolio
summary: Added a third post type for non-technical writing, wired up a scroll-triggered sticky footer, and put a headshot in the hero.
---

Three separate additions that each touched different layers of the site.

## Essays as a first-class post type

Sometimes you want to post a blog post that doesn't have a project or bug related to the post. Sometimes a blog post should just be a blog post — a place for plain text to be read as is. That's why I added `essay` to the content schema's `type` enum alongside `case-study` and `build-log`.

Added  Essays have their own layout (`Essay.astro`) with a narrower column, no stack tags, hashtag-style topic tags instead. The blog feed got a dedicated tab and an `EssayCard` component with a neutral grey badge to visually distinguish them from case studies and build logs at a glance.

The routing fix was worth noting: the original `[slug].astro` used a `!isCaseStudy` fallback that sent everything non-case-study through `BuildLogLayout`. Changed to explicit `type === '...'` checks for all three branches so new types can be added without accidentally inheriting the wrong layout.

My plan is for essays to be more blog-style posts where I can share my political and personal writings to a broader audience. I've always been intersted in `data-journalism`, which I feel like fits the profile of this blog if I ever discover an intriguing story to tell.

## Scroll-triggered footer

The original footer was in `Base.astro` and appeared immediately below page content. For the home page, this meant the footer sat awkwardly between the Recent Work section and the Skills section. Refactored into two pieces:

- **Main footer** (`Footer.astro`) — nav links, copyright, social icons. On the home page this is `position: fixed; bottom: 0; transform: translateY(100%)`, hidden off-screen by default.
- **AI attribution** — moved to the very bottom of the skills section on the home page, only readable when fully scrolled, sitting below the footer's natural reveal point.

An `IntersectionObserver` watches `#skills-section`. When it enters the viewport the footer slides up from below; when the skills section is still below the fold the footer stays hidden. Other pages use the normal in-flow footer via `Base.astro`.

## Headshot in the hero

Added a headshot to the right side of the hero section. The image is a background-removed PNG (exported from Affinity Photo with the canvas cropped to the subject) displayed at `h-[480px] w-auto` aligned to the bottom of the flex container, so I appear to stand at the base of the dark hero band. No cropping or overflow tricks needed once the canvas matched the subject.
