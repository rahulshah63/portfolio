import { defineMiddleware } from 'astro:middleware';

// Links to other sites open in a new tab. Runs when pages are built, so the output is plain HTML.
const ownHost = new URL(import.meta.env.SITE ?? 'https://rahul-shah.com.np').host;
const externalLink = /<a\s([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/g;

export const onRequest = defineMiddleware(async (_context, next) => {
	const response = await next();
	if (!response.headers.get('content-type')?.includes('text/html')) return response;

	const html = (await response.text()).replace(externalLink, (tag, before: string, href: string, after: string) => {
		if (/\starget=/.test(tag) || new URL(href).host === ownHost) return tag;
		return `<a ${before}href="${href}" target="_blank" rel="noopener noreferrer"${after}>`;
	});

	const headers = new Headers(response.headers);
	headers.delete('content-length');
	return new Response(html, { status: response.status, statusText: response.statusText, headers });
});
