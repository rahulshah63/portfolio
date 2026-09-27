---
title: Picking a stack I can keep for ten years
description: Why this site is Astro, plain CSS and Markdown on Cloudflare, and how I would leave if I had to.
date: 2026-09-28T09:00:00Z
illustration: blocks
---

My old site was a single `index.html` from 2021, held together by Bootstrap, jQuery and a dozen plugins. It still loaded, but I had stopped updating it, because every change meant remembering how all of it fit together. This time I wanted something I would still be happy to open in ten years.

## What I optimized for

- **Content I own in plain files.** Notes are Markdown files in the repo, and everything on the home page lives in one TypeScript file.
- **Output that is just HTML.** If the framework disappeared tomorrow, the built site would keep working anywhere that serves static files.
- **Few dependencies to upgrade.** No CSS framework, no UI library, no client-side framework.

## What I picked

**Astro** builds the pages. It ships no JavaScript unless a page asks for it, and its content collections type-check the frontmatter of every note, so a typo in a date fails the build instead of the page. Cloudflare acquired the Astro team in January 2026 and kept the framework MIT-licensed, which settled my worry about it being abandoned.

**Plain CSS** handles the design. One file defines the colour tokens for light and dark, and each page keeps its own scoped styles. There is nothing to migrate when a CSS framework ships a new major version.

**Cloudflare** hosts the site as static files on Workers. My domain's DNS was already there, which also makes subdomains, and Cloudflare Tunnel for anything I want to share from my own machine, a few commands each.

## The exit plan

The real risk is leaning on one company for the framework, the hosting and the DNS. In practice it is small: the site is a folder of HTML and the notes are Markdown, so moving to GitHub Pages or Netlify would take an afternoon. Choosing boring, portable pieces is what keeps the long-term bet cheap.
