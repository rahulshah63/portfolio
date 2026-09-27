---
title: How to write a post
description: A template for new posts. Drafts only show up while running the dev server.
date: 2026-09-28
category: Guide
illustration: notebook
draft: true
---

Copy this file, rename it, and change the frontmatter above. The file name becomes the URL, so `my-first-note.md` is published at `/notes/my-first-note/`.

`category` shows next to the date and reading time. `illustration` picks the drawing shown with the post: mountains, blocks, gift, audiobook, shelf, notebook, lamp or plane.

Set `draft: false` (or delete the line) when it is ready. Drafts are visible with `npm run dev` and are left out of the published site.

## What Markdown gives you

Headings, **bold**, _italic_, [links](https://rahul-shah.com.np), lists and quotes:

- One point
- Another point

> A quote from something worth keeping.

Inline `code` and code blocks:

```ts
const answer = 42;
```

Images go next to the post: put `diagram.png` in `src/content/notes/` and write `![What it shows](./diagram.png)`.
