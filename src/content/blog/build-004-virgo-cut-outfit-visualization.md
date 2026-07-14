---
title: "Build Log #004: Cutting Outfit Visualization"
date: 2026-06-25
type: build-log
tags: [meta, virgo, gemini, cost, product-decisions]
stack: [Python, Gemini]
project: virgo
summary: Built Gemini image-gen outfit visualization, then pulled it from main before it ever launched.
---

This is one of the shorter build logs; this build was pretty straightforward, I just removed any mention of visualization from any of the tool calls and frontend code. This also included any mention of collecting a reference user image for the visualization in onboarding or settings.

I had built outfit visualization into [Virgo](virgo), an AI wardrobe management agent, but I wasn't satisfied with the results, and it cost far too many tokens to justify in a demo. In order to deploy this demo-app more openly, I decided to pull this feature before the costs outweighed the value of keeping this demo deployed. The decision was mostly down to budgeting for the worst case scenario, and the best part: I can always add the feature back in. Rather than delete the work, the full implementation is preserved on the `outfit-visualization` branch.

I was proud of this feature because this was something we didn't bother testing when I was building [Cloak AI](cloak-ai); We had been thoroughly spooked over API costs earlier in the projects lifecycle and didn't want to chance somebody expending our API credits again. I had managed to get the visualizations working far better than we could've ever imagined.

The only real bug I ran into when I was building the visualization feature was that after a certain point, the reference images stopped being used directly, and rather were being referenced by text description, rather than inputting the actual image into the final picture. It's a weird bug, but that's how prompt engineering can be, I'll probably resolve it later. Thinking a little longer term, since I want to build a moat around the app and paywall a couple features, this would be a good feature to put behind a paywall, and it already works pretty well.

Shipping a working, demoable feature is the easy call. Pulling one that's already built and works, because the cost model doesn't survive contact with real usage, is the harder one. This is the kind of call that's invisible in a demo but matters the moment an app has actual traffic.

## Next Up

Onboarding is simple again. Next up: a startup walkthrough and a feedback loop, so the app can explain itself and collect real signal from anyone who tries it.
