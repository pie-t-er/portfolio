---
title: "J*b Runner: My Personalized Jobright Copycat"
date: 2026-07-13
type: case-study
tags: [automation, python, react, docker, web-scraping]
stack: [Python, FastAPI, BeautifulSoup, React, Vite, SQLite, Docker, Playwright]
github: https://github.com/pie-t-er/job-dashboard
projectName: J*b Runner
summary: A self-hosted job search tool that aggregates listings, tailors my resume and cover letter against the listings, scores the listings for compatibility, and automates application submission.
---

## Friction

I hate searching for jobs. It's not rude or offensive to say that. Nobody likes the insecurity and uncertainty of being unemployed, and the daily growing desperation just for the opportunity to make money is a crushing weight that grows by the ton. I felt an overwhelming amount of friction with this challenge, and had faced defeat for years in the past, so I resolved to apply my talent as a software engineer and computer scientist to this problem, and see if I could personalize and streamline my job search. In the spirit of working "smarter, not harder," I treated the job application process as a data pipeline that starts with my resume and ends with a job offer.

Job searching at scale is repetitive in a way that feels designed to be automated. You open the same platforms every day, apply similar filters, read descriptions that are 80% boilerplate, and paste the same information into slightly different form fields. The parts that actually require judgment, "is this role interesting?", "Is this company worth my time?" — take maybe 10% of the effort. The rest is busywork.

Before I found out about [Jobright](https://jobright.ai/), I thought that the only way to manage your job search was through Linkedin and a Notion dashboard. I wanted to be able to automate the applications and automate the resume tailoring, I didn't realize this problem had already been solved (This is a common revelation for me). It wasn't long before I discovered Jobright, but that actually proved to me that having some ownership over the scoring and tailoring pipeline makes my application more valuable for me. I have more atomic control over how this pipeline works, and that gives me more power than Jobright could in some ways.

They say the job search is all about shots on goal; that you'll only get a job once you've applied to a thousand, been rejected by half, rejected in interviews for another half, then got ghosted by another half, and then another half of those offered a second interview, and then of those interviews, there were 10 behavioural interviews, and of those you get 3 offers. That's the state of the job search today. I built this to handle the busywork, the monotony, the excessively boring parts of the job search. If applying to jobs as a computer science new grad is truly a numbers game, my work flow will prove it. The ultimate goal was to make a job application dashboard that would apply to jobs while I sleep, but I quickly learned that the best applications are the tailored, friendly, personal applications.

## Architecture

Three layers in a monorepo, communicating through a REST API:

**Backend (FastAPI)** handles the API, scheduling, and database. SQLite stores all job records, blocklist flags, role classifications, and application status in `user_data/jobs.db`. A background scheduler triggers scrapes on a configurable interval. The apply endpoint is the interesting one — it generates a tailored PDF, then launches a headed Playwright browser in a background thread to fill the application form, returning immediately so the UI doesn't block waiting for a browser session to complete.

**Scraper** uses a registry-based design: each platform (Greenhouse, Lever, Workable, Ashby, Himalayas, SimplifyJobs, USAJobs) is a self-contained class registered with a runner that dispatches to each, normalizes results into a shared `Job` dataclass, upserts to SQLite, and then runs blocklist and role-classification sweeps over the new records.

**Frontend (React + Vite)** is a five-tab dashboard: Jobs (paginated, filterable feed with match scores), Triage (shortlisted jobs pending action), Analytics (skill/keyword term frequency across all scraped listings, used for knowing what to put on your resume), Config (blocklists, sources, autofill settings, scoring weights), and Resume (live editor for `master_resume.json`).

## The Tailoring Pipeline

`master_resume.json` is the source of truth for resume content. It's much longer than a single page and gives the algorithm options to select into the eventual resume. When you apply to a job, a scoring pipeline matches the job description against your resume bullets using skill, role, and keyword signals to rank relevance and select the most applicable bullets for that specific posting. A PDF builder then generates the tailored resume from the selected content. The same is done for cover letters, as requested. The bullets from the resume are the same used as exhibits for the cover letters.

Having a big database of jobs is nothing without signals about which jobs to apply to. Not every one of the thousands of jobs are ones we want to apply to, so there's a sense of compatibility between every job and my resume. I want every job to get the resume that highlights the right parts of my profile. If I'm applying to a machine learning engineering position, I want to show off my machine learning coursework and projects rather than my SWE experience. I have a diverse skillset, but I only get a page to show it off, so I have to make that count.

The result isn't a lie or an exaggeration, it's the same real experiences that would go into any tailored resume, surfaced in the order most relevant to that particular job. The difference between a generic resume and a tailored one is usually just emphasis, and the pipeline automates the emphasis decision.

## Deployment

I currently have a demo of this app live at [j*brunner](https://j-brunner-demo.onrender.com/), I stripped away most any real utility of the app for this, but I'd like to be able to add features to the app and demo them from this web app. If you're landing on the page cold I'd recommend clicking the question mark on the bottom right corner of the screen for a walkthrough of the apps features. Features like the triage page and autofill are noticeably absent, the resume and config pages are read-only, and there's no light/dark mode toggle, but the app looks better in light anyway. The data present in the demo is a 100-job slice of the job database, scraped once a week off of a GitHub action since the listings are stored in the GitHub repo. You can still generate resumes and cover letters, search for jobs, and see scoring, but it's all tuned to my master resume, so it would generate my resume, cover letter, and scoring for every job.

I also realized far too late that this demo is itself a portfolio piece; you can't help but look at my resume and download a tailored version of it while you're testing my app. It's nice to know anybody genuinely interacting with my demo is simultaneously taking in my resume.

Give the demo a lookaround and leave some feedback using the report form at the bottom right corner of the screen. The walkthrough and feedback form are some UI decisions I recently added to most of my projects to add real UI value. A major piece of feedback I get usually in live user demos is that they don't know where to start or how to use the app, so I hope the walkthrough and feedback workflows address this.

The Docker deployment in the `README.md` is untested, I had started writing some Docker files for running from my Fedora desktop but never got it working. Who knows, it might work for you. Docker Compose runs two containers: the FastAPI backend on port 8000 and an nginx-served React build on port 80. Everything persistent (the database, config files, resume JSON, apply log) lives in `user_data/` mounted as a volume, so it survives container rebuilds without losing state. The whole thing is self-hosted by design; job search data is genuinely sensitive and doesn't belong in a third-party SaaS.

## What Broke

**Playwright in a background thread is inherently fragile.** Headed browsers have a way of surfacing OS-level issues that headless doesn't and running one in a thread means errors surface asynchronously in ways that are hard to trace. Some application submissions silently fail when the browser doesn't reach the expected state. The application pipeline can never go fully autonomous, unfortunately.

**Platform structure changes constantly.** Greenhouse's form layout changed twice during development. Each change broke the Playwright fill logic for that platform and required manual inspection and patching. The scraping layer is more resilient (BeautifulSoup against structured API endpoints), but the form-filling layer is fragile by nature.

## What's next?

I'm currently in the middle of dogfooding this application in my own job search; whenever I find new bugs, feature ideas, or insight, I write it down and add it to the backlog. I try to keep these case studies up to date with the actual features of the project, you can read the build logs below for in-depth development notes and information about implementation as it happens.

The current backlog:

- Bring back autofill for some platforms, get it to a usable state
- Get used to the new resume builder workflow, although it should be less friction than before
- Keep collecting job data, adding more sources, exhausting job sources.

If you want to read more about how I work on the job and how I'm working to become unemployed, check out my [Frequently Asked Questions](job-search-faq). I use these as part of the autofill module to fill in more unconventional questions as they come.