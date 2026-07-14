---
title: "Build Log #001: Making the demo more demo-able"
date: 2026-06-22
type: build-log
tags: [meta, virgo, mongodb, data-quality, gcp]
stack: [Python, MongoDB Atlas, Google Cloud Run]
project: virgo
summary: DON'T TRUST THE COLOR COLUMN
---

Virgo's hackathon deadline passed 11 days ago, and the app works well, but it could use some touch-ups. I had spent half of the last week before the missed submission polishing, but there was still a little bit more polish left before the app could be left alone. This build log is the documentation of that final polish.

This build was pretty light, just verifying some behavior and reset the venv since I uninstalled a bunch of stuff from my laptop (including Anaconda Python, which I had this project configured on) and had to reset all of my projects dependencies. Catching a clean slate for a new round of developement.

When I scraped this Macy's catalogue data originally, I had tried to run a K-Means Clustering algorithm on the image pixel data, but due to various sources of noise such as skin tones, lighting, and background bleed, it became hard to tell when the clothing was a solid color, patterned, or genuinely multi-colored, so 65% of listings in the database were labelled as "mutlicolor." The related RGB values attached to listings were just as unreliable, as they were the primary color selected by that same clustering algorithm, but had a lot of noise in its calculations. It was a winding workaround that never winded it's way around to quality data, Claude had to take a heavy note of this. It's also just a big loss because color data would've been very informative for styling. I maintain that color theory can do a lot for styling clothing, hopefully this can be resolved for scanning user images in the future.

## What was built

- Re-seeded all ~72 `wardrobe_items` from the Macy's men's/women's CSVs, but changed how the seed script infers metadata: color now comes from keywords in the item's name rather than the CSV's own color column, which turned out to be unreliable — patterned or multi-tone items were labeled inconsistently, so name-based inference was the more honest source. Season is inferred from name + article type instead of defaulting everything to "all seasons." `temp_min`/`temp_max` are derived from article type instead of being left blank.
- Verified the `?fresh=1` demo-reset flow end-to-end, the one a stranger clicking a live link would actually hit.
- Rebuilt the Python virtualenv on a python.org 3.12 build.

## Where it stands

Data quality and infrastructure are solid enough to build actual features on top of without second-guessing what's in the database. Next up: the calendar and a weather tool, so outfit recommendations can account for more than just what's in the closet.
