# Portfolio

Personal portfolio and blog for an active software engineering / data science job search. Built with Astro 5, React islands, and Tailwind CSS. Deploys to Netlify on push to `main`.

> The majority of this site was built with [Claude Code](https://claude.ai/code), an agentic AI coding tool by Anthropic, with human direction and review.

---

## Running locally

```bash
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # production build
npm run preview   # preview production build locally
```

Node 20+ required.

## Project structure

```
src/
  components/         # Astro + React components
    patterns/         # Decorative SVG components (Divider, CardAccent, HeroTexture)
    SocialLinks.astro # GitHub / LinkedIn / Instagram icon links — single source of truth
    Navbar.astro      # Sticky header; hidden on mobile homepage via hideOnMobile prop
    Footer.astro
    BlogFeed.jsx      # React island — filterable blog feed
    SkillBars.jsx     # React island — skill panels driven by case-study stack tags
  content/
    blog/             # All posts as .md files
    config.ts         # Content collection schema
  data/
    activeBuilds.ts   # Projects shown in the "Active Builds" homepage widget
    liveDeployments.ts # Live demo links — homepage card grid + mobile dock
    skills.ts         # Skill groups for the homepage skill bars
  layouts/
    Base.astro        # Shell (Navbar, Footer, fonts). Props: noFooter, hideMobileNav
    CaseStudy.astro
    BuildLog.astro
    Essay.astro
    Archive.astro
  pages/
    index.astro
    about.astro
    blog/
    work-with-me.astro
    thanks.astro
  styles/
    global.css
```

## Content model

All posts live in `src/content/blog/` as Markdown files. Four post types, each with its own layout and accent color:

| Type | Layout | Accent | Use for |
|------|--------|--------|---------|
| `case-study` | `CaseStudy.astro` | forest | Long-form project writeups with stack/github/demo metadata |
| `build-log` | `BuildLog.astro` | brown | Short changelog entries tied to an active project via `project` field |
| `essay` | `Essay.astro` | purple | Personal, non-technical writing |
| `archive` | `Archive.astro` | navy | Old college writing — renders with an "unrevised" disclaimer banner |

Match frontmatter to the schema in `src/content/config.ts`. Don't add top-level fields without updating that schema.

The `stack` field on `case-study` posts drives the homepage skill bars automatically.

### Adding a post

```yaml
---
title: "Post Title"
date: 2026-07-01
type: case-study        # case-study | build-log | essay | archive
tags: [tag-one, tag-two]
stack: [Astro, React]   # case-study only, drives skill bar panels
summary: "One-line description shown in the feed and on the homepage."
github: https://github.com/...   # optional
demo: https://...                # optional
---
```

For `build-log`, also add `project: <id>` matching an entry in `src/data/activeBuilds.ts`.

## Homepage data files

**`src/data/activeBuilds.ts`** — drives the "Active Builds" widget. Add a project here while it's in active development; remove it and write a case study when it ships.

**`src/data/liveDeployments.ts`** — drives the "Live" section on the desktop homepage and the deployment links in the mobile dock. Fields:
- `name` — display name
- `description` — one-liner shown on the desktop card
- `url` — external link (opens in new tab)
- `caseStudy` *(optional)* — blog post slug; adds "Read case study →" on the desktop card

## Mobile

Below 640px the homepage becomes a static full-viewport dock — name, 4 nav links, 3 live deployment links, and social icons. No hero, no scroll. Inner pages scroll normally. The dock and desktop homepage share the same route; a Tailwind `sm` breakpoint switches between them with no JS or UA-sniffing.

## Deployment

Deploys automatically to Netlify on push to `main`. Build command: `npm run build`, publish directory: `dist`.

## Design notes

Dark-mode-first (`#0d0f0e` background, `#f0ece3` text). Fonts: Playfair Display (headings), Inter (body), JetBrains Mono (code/metadata) — self-hosted via `@fontsource`.
