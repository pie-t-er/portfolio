---
title: "Build Log #001: Blog Infrastructure"
date: 2026-05-23
type: build-log
tags: [meta, astro, portfolio]
stack: [Astro, React, Tailwind CSS, TypeScript]
project: portfolio
summary: Migrated from Create React App to Astro 5, set up content collections for two post types, and built a filterable blog feed.
---

Migrated the portfolio from Create React App to Astro 5. CRA was at end-of-life and had no native path to a content-aware blog system.

I set up Astro content collections with a `blog` collection that supports two post types: `case-study` (long-form with a metadata sidebar showing stack, timeline, and links) and `build-log` (short-form, changelog-style). Both share a single filterable feed at `/blog`, driven by a React island so the filter state is client-side without shipping a full bundle.

Wrote three placeholder case studies for existing projects. The frontmatter `stack` field on each post will drive the homepage pentagonal skill panels — no manual curation needed.

Chose to stay on Tailwind v3 rather than migrating to v4's CSS-first config, which is still stabilizing in the Astro ecosystem. Can revisit when `@astrojs/tailwind` has first-class v4 support.
