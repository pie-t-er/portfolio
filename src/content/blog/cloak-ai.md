---
title: "Cloak AI: Leading a Team and Scraping Macy's"
date: 2026-04-28
type: case-study
tags: [machine-learning, web-scraping, python, team-lead, group-project]
stack: [Python, Jupyter, BeautifulSoup, Next.js, React, Node.js, OpenAI, MySQL]
github: https://github.com/pie-t-er/Senior-project
projectName: Cloak AI
summary: A wardrobe management app built as a five-person senior capstone. I led the team and implemented the data pipeline.
---

## What It Is

Cloak AI is a wardrobe management and AI styling assistant — think a chatbot embedded in an online clothing store that knows your wardrobe, understands the weather, and recommends outfits you'll actually wear. The system lets users ask natural language questions ("what should I wear to a job interview this week?"), receives recommendations pulled from real catalog listings, and learns preferences over time.

It was a five-person senior capstone project. I was team lead. My individual technical contribution was the data integration pipeline: scraping Macy's catalog and converting the listings into the embeddings that grounded the chatbot's recommendations.

## What I Built

The pipeline lives in a Jupyter Notebook. BeautifulSoup scrapes Macy's product listings (titles, prices, colors, images) and normalizes them into CSV files by binary gender. Those CSVs are then converted into vector embeddings and delivered to the LLM APIs (OpenAI and Google Gemini) so the chatbot can retrieve relevant items from the actual catalog rather than hallucinating products.

The scraper is what made the demo work. Without real catalog data, the chatbot has nothing to recommend. With it, the AI can actually pull a specific cotton shirt from a real listing and link to it. This is the difference between a demo that impresses and one that doesn't.

## The Broader System

The rest of the stack was a Next.js frontend with a Node/Express backend and MySQL database. The backend integrated a live weather API for Gainesville so the outfit recommendations would account for current conditions (the model returns summer clothing on hot days, warmer layers when it's cold). Authentication, a "like" feature for saving outfits, and the chatbot interface were all wired up and working locally.

I must admit I was heavily siloed to my portion of the project, I kept running into issues when trying to build the pipeline. In the end we didn't have demo data until the last couple weeks of the project. I had been preoccupied with this part of the project for far longer than I ever intended to. This is an important part of the project, and ultimately, the data was of a high quality, I can take pride in that.

We planned to deploy on AWS but the cost was prohibitive for a student project, so the whole thing ran locally. This was another major set back for the project. We almost got charged $200 by AWS on an accidental data transfer, which really killed team morale.

## Team Lead

In a semester where me and my team faced many curve balls, leading this team translated to managing expectations. We started the class with big dreams for where the project could take us, then we converged on an app concept, then diverged as our plans didn't pan out, and then scrapped across the finish line with a working demo.

Consistency. That's the biggest thing I bring to the table as a team lead. I will always play like the score is 0-0. In this team, I was really proud of the work my teammates had put into the project, I know we all faced unique challenges but the frontend Ishan built and the Backend Harshil and Amelia built works really well. I can tell a lot of thought went into this project, and that means a lot to me as team lead.

## What Broke

**The CSV will go stale.** Macy's rotates its catalog continuously. Within weeks of the scrape, some listing links were already dead. The data is a snapshot, not a live feed. This is fine for a demo, but makes the product unusable at any real scale without a scheduled re-scrape or a direct catalog API.

**Color data was unreliable.** I had tried to overengineer another pipeline that would aggregate pixel data from the listing images, run a K-Means Clustering algorithm on that image, and attempt to get the color of the clothing article. This never really panned out, as picture lighting, other outfit pieces, and skintones all provided far too much noise to classify the clothing colors reliably. I left the color labelling, and the identified "Primary Color" RGB-value in the csv files, but they're of no real use.

**The app was just really buggy.** I can say this now that I've gone back and rebuilt this app concept as a solo project, read more about that [here](virgo). Proper integration of the AI tooling provided by the Google SDK with the actual prompt engineering takes a lot of testing and debugging. I used up a fair share of tokens testing my application, I don't think Cloak ever achieved that level of functionality.

**Outfit generation had no deduplication constraint.** The AI would sometimes recommend an outfit with two shirts or two pairs of pants because the LLM wasn't given an explicit rule about garment categories. It's a prompt engineering problem as much as a data problem, but it made demos awkward. There were plenty more bugs just like this one.

## What I'd Change

This app is nothing without well-sourced product listings or user-generated data, that's just natural with this kind of app. The value is in connecting users with a specific kind of product when they want it. I think leaning more heavily into the smart shopping concept of this app, building a browser extension that acts as a smart shopping assistant that has contextual awareness of your wardrobe, could be useful in a substantive way.

It's easy to get drawn into questions about maintaining the demo data, as the Macy's data won't persist forever. That's not the point of this project, the app should provide more value than the data it presents. If the app doesn't work without data then it won't work with user data.

On the team lead side: I'd push harder for an integration environment earlier in the project. We developed in isolation for most of the semester and integrated near the end, which is the classic mistake. Even a shared dev server (which the university could have provided if we'd applied earlier) would have surfaced integration issues weeks before they became deadline pressure.

All-in-all, I'm really proud of this project. I couldn't have asked for a better team, and we brought an app to life that I thought wasn't feasible before.
