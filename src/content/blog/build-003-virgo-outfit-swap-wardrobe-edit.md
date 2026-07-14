---
title: "Build Log #003: Swapping Outfits and Editing Wardrobe Items"
date: 2026-06-24
type: build-log
tags: [meta, virgo, react, ux, agent-tools]
stack: [React, Google ADK, MongoDB Atlas]
project: virgo
summary: Made outfit cards swappable item-by-item, wardrobe items editable in place, gap analysis lead with real counts instead of vague advice.
---

This build log is more of the same; I did some dogfooding, quickly came up with a new design for the outfit curation workflow, and made some frontend changes to tune the cosmetic look of the chat to this vision. I wanted larger cards, with a silhouette for the accessory card, so that it could always be added later. The card takes up a lot of real estate on the page so maybe it might be better to revert to a 1 x 3 row of a standard outfit, with the option to add an accessory below that row, I'm not entirely sure, but I like how this looks. It was removing the "accessorize" button from the chat action bar that made me realize that I didn't want the visualizations in the demo. I resolved to clean up the look of the chat action bar, make chat tool usage and interactions limited to text and outfit curation.

I also added the option to edit wardrobe items, this seemed inevitable to me and while I could see it being abused on a live demo like this, I didn't foresee that happening here. I finished with some prompt engineering, still trying to wrangle the gap analysis into insightful-looking shopping advice.

## What was built

- **Outfit panel.** Switched to a 2-per-row grid of portrait (3:4) thumbnails with a `→` control that swaps a single item for an alternative without regenerating the whole outfit. Added an always-present accessory suggestion card alongside the main outfit
- **Wardrobe editing.** Item detail modal, with an Edit button that reuses the same Add Item form, pre-filled with the item's existing data.
- **Gap analysis.** Added a check for bottom length and silhouette variety, and steered the agent's phrasing to lead with concrete counts ("you have 6 tops and 1 pair of pants") instead of vaguer style advice that's harder to act on.

## Where it stands

Outfit interaction, wardrobe editing, and gap analysis all feel like real product features now, not demo scaffolding. Next: cutting a feature that was already built and working, because the cost didn't hold up.
