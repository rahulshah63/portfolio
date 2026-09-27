---
title: External links in a new tab, with no client JavaScript
description: A few lines of Astro middleware that rewrite links once, while the site builds.
date: 2026-09-28T12:00:00Z
illustration: plane
---

I wanted every link to another site to open in a new tab, including links I write inside notes. Adding `target="_blank"` by hand is easy to forget, and a script that patches links in the browser runs on every page view for something that never changes.

Astro middleware also runs while static pages are built, so it can rewrite the HTML once and ship the result:

```ts
import { defineMiddleware } from 'astro:middleware';

const ownHost = new URL(import.meta.env.SITE).host;
const externalLink = /<a\s([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/g;

export const onRequest = defineMiddleware(async (_context, next) => {
	const response = await next();
	if (!response.headers.get('content-type')?.includes('text/html')) return response;

	const html = (await response.text()).replace(externalLink, (tag, before, href, after) => {
		if (/\starget=/.test(tag) || new URL(href).host === ownHost) return tag;
		return `<a ${before}href="${href}" target="_blank" rel="noopener noreferrer"${after}>`;
	});

	const headers = new Headers(response.headers);
	headers.delete('content-length');
	return new Response(html, { status: response.status, headers });
});
```

A few details that matter:

- **Only `http` and `https` links match**, so `mailto:` links and links to my own pages are left alone.
- **Links that already set `target` are skipped**, so a page can still opt out.
- **The old `content-length` header has to go**, because the body is now longer than it was.

A regular expression over HTML is usually a bad idea. Here the input is my own build output, which is predictable, and the whole thing is a dozen lines I can read at a glance. Every external link in the built site now carries `target="_blank"` and `rel="noopener noreferrer"`, and the browser runs no extra code for it.
