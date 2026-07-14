---
title: "Build Log #002: Making the demo more more demo-able"
date: 2026-06-23
type: build-log
tags: [meta, virgo, calendar, weather, mongodb]
stack: [Python, Google ADK, MongoDB Atlas, React]
project: virgo
summary: Let the calendar hold more than one outfit per day
---

This build was mostly about making the demo more demoable. I wanted to be able to demo the app without having a city, reference image, or name saved. I was dogfooding the app, looking for weakpoints in the UI and model behavior, and then adding each to a backlog to work on. The goal was to get most if not all surface level bugs resolved so that any user could demo the app themselves. I also verified that the demo reliably resets when instructed to.

## What was built

- **Calendar, multiple outfits per day.** `POST /api/calendar` switched from a replace to an `insert_one`, so a day can hold more than one planned outfit. `CalendarView` groups entries by date and renders each day's items as vertical image stacks; a slider (arrows plus dots) moves between outfits on the same day. The "plan" button only shows on future days, there's nothing to plan for a day that's already happened.
- **Weather tool.** `get_weather` hits wttr.in for dates up to three days out and falls back to a city-aware seasonal estimate beyond that. `set_user_location` saves a user's city to their profile the moment they mention it in conversation, not just during onboarding.
- **Weather is optional, on purpose.** It never blocks outfit generation. A wttr.in outage or a city the tool doesn't recognize should degrade the recommendation, not break it.
- **Demo reset endpoint.** `POST /api/demo/reset` deletes the `user_profile` doc, clears the calendar, and resets the agent session. This is what the frontend's `?fresh=1` param and the Settings "Reset demo" button actually call. The reset stopped being a manual database wipe I'd run before showing anyone the app.

## Decisions

Making weather non-blocking was a deliberate call, not a fallback I backed into after something broke: a tool that can fail (an unreachable API, an unrecognized city) shouldn't be load-bearing for the app's core feature. Outfit recommendations work with or without a weather read.

## Where it stands

Calendar and weather are both solid. Next up: outfit swapping, wardrobe item editing, and chattt
