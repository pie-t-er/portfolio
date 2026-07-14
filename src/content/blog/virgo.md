---
title: "Virgo: A Wardrobe Agent That Outlived Its Hackathon"
date: 2026-07-04
type: case-study
tags: [ai-agent, machine-learning, mongodb, google-cloud, hackathon, full-stack]
stack: [Python, Google ADK, Gemini, MongoDB Atlas, FastAPI, React, Vite, Google Cloud Run, GitHub Actions]
github: https://github.com/pie-t-er/virgo
demo: https://virgo-85048588163.us-central1.run.app
projectName: Virgo
project: virgo
summary: A wardrobe-management AI agent built for a Google Cloud hackathon that missed its own submission deadline, and kept going anyway, into a live Cloud Run app with weather-aware outfit planning, a calendar, gap analysis, and a guided onboarding tour.
---

## What it is

Virgo is a wardrobe-management agent: you tell it what's in your closet, ask it what to wear, and it recommends full outfits — accounting for the weather, your sense of style, and the gaps in what you actually own. Under the hood it's a Google ADK agent (Gemini 2.5 Flash, with a six-model fallback chain) backed by MongoDB Atlas Vector Search over 3072-dimension embeddings of every wardrobe item, wrapped in a FastAPI backend and a React frontend, deployed to Google Cloud Run.

It started as an entry for the **Google Cloud Rapid Agent Hackathon** (MongoDB track). It's live on Google Cloud Run at [virgo-85048588163.us-central1.run.app](https://virgo-85048588163.us-central1.run.app), you can add `?fresh=1` to the URL to reset it to a clean onboarding state or do so from the `Settings` tab.

## Where it started

The Rapid Agent Hackathon came at a time where I felt my portfolio was sorely missing a deployed app, and I'd always wanted to participate in a hackathon but shied away for one reason or another. I had the time, set my sights on this hackathon knowing I had a week with it, and went to work.

I had spent my senior year working on this app concept centered around "wardrobe management," read more about my senior capstone [here](cloak-ai). I had come up with the idea when I wanted to plan my outfits in advance with an app tailor-made for the workflow. I felt this would be a good application for an AI agent, as it provides just the right amount of user data with genuine chat engagement and prompting. Fashion is conversational, and the workflows present in this demo expresses that.

After spending a whole semester building this app as a senior capstone, I had a half-baked app and a bunch of clothing data. I wanted to do the project justice and try to more closely fulfill the vision I had tried to achieve in a team setting.

One week of hacking, and I emerged with all of the features I scoped. The chat features returned genuine responses that matched instruction, and I was finding emergent capabilities that I never expected the model to be able to produce originally. Above all, the app worked. I left the demo video recording late, I had been dreading it because I knew it would take a lot of takes to get right. I eventually got my act together and recorded a 30-minute video to be cut down to 3 minutes.

Now the hard truth: the hackathon submission never happened. The demo video corrupted mid-editing mere minutes before submission. As I was scrambling to edit the video together in Kdenlive (woohoo open source tools!), the video encoding failed and ruined the edit. I wouldn't be so quick to blame my tardiness on the editing software, I easily could've and should've made the submission 24 hours earlier. That's the only real takeaway here, and I have to be real about that.

Rather than shelve the project in indignation, I kept it deployed as a personal portfolio project, safe from the pressure of a hackathon deadline. I'm proud of the app I made, and I wanted to show it off now that I've built it out further. This is the first app demo I've ever deployed online before so this is a big deal for me.

## Design

**A six-model fallback chain.** Every agent turn tries `gemini-2.5-flash` first and falls through five more models (`2.0-flash`, `2.5-flash-lite`, `3.5-flash`, `3.1-flash-lite`, `2.0-flash-lite`) on a 429 or 503. I built the fallback in from the start so that a single quota hiccup during a demo (or a stranger clicking around the live link) degrades quietly to a cheaper model instead of surfacing an error.

**Gender-filtered vector search.** `semantic_search()` runs `$match` on gender after `$vectorSearch`, reading the filter from the user's profile at call time, rather than trying to push the filter into the vector stage itself. It's a small ordering decision, but it's the difference between "search everything, then narrow" and fighting Atlas's vector-search filter syntax for a stage that isn't built to filter first. Ultimately, this implementation keeps the user in the loop on the queries AI makes.

**Weather-aware outfit suggestions.** `get_weather` checks wttr.in for the next three days and falls back to a seasonal estimate beyond that. An API outage degrades the suggestion; it doesn't break the feature.

**Demo reset.** `POST /api/demo/reset` clears the profile, the calendar, and the agent session in one call, wired to both a `?fresh=1` URL param and a Settings button. Anyone who lands on the live link from a portfolio site or a social post gets the same clean-slate onboarding I'd get running it locally for the first time.

## Features

- **A tool-using chat agent** — wardrobe CRUD, semantic search, calendar planning, gap analysis, and weather, all as ADK function tools the model calls directly rather than a scripted flow.
- **A weather-aware, multi-outfit calendar** — more than one planned outfit per day, with a slider to move between them.
- **Gap analysis** that leads with concrete counts, gives actionable tips, and identifies structural weaknesses instead of offering vague style advice.
- **Item-level outfit swapping** — trade out a single piece of an outfit without regenerating the whole recommendation.
- **Guided walkthrough and feedback button** that files straight to GitHub Issues with real conversation context attached — see [Build Log #005](/blog/build-005-virgo-guided-tour-feedback).

## The Ugly

The biggest takeaway from a project like this is that AI chat features are always going to be nondeterministic and therefore subject to a whole other dimension of edge cases. I've managed to extensively test the current state of the chat with the suggested prompts displayed on the page, but beyond those prompts it's hard to predict how well the model will respond. I intentionally included a bug report within the chat bubble for this very reason; the chat log is included as part of the bug report which is saved as a GitHub Issue.

It's also clear that while the chat feature itself isn't that expensive, the visualization feature could quickly drain tokens, so I siloed that feature to a dev branch for a future paid-tier feature. I'm comfortable with strangers using my API credits for the LLM chat as it is, but users would have wasted the credits on the visualizations feature if I left that available publicly.

The demo is very stable by my standards, I'm very proud of how well polished it is.

## What's next

The backlog is ordered by dependency — each item unblocks the ones after it:

1. **OAuth.** The whole app currently runs on a single shared `demo_user` profile. Real per-user accounts (likely Google OAuth via `authlib` on FastAPI) are the prerequisite for everything below.
2. **Stripe, paid tier.** Once accounts exist, a subscription check gates the highest-cost features, starting with outfit visualization, then uncapped AI chat, then AI-driven gap analysis and shopping tools.
3. **AI-free outfit curation.** A Tinder-style swipe UI for manually building outfits from existing wardrobe items, with zero LLM calls in that path — the free-tier feature meant to deliver value without triggering API cost at all.
4. **A mobile-first rewrite**, camera-first for adding items, likely React Native. Blocked on OAuth and on the AI-free curation path settling what the core free-tier experience actually is.
5. **A second embedding provider.** Mongo's vector search may work against OpenAI embeddings as well as Gemini's. Lowest priority since I don't have any OpenAI credits.
