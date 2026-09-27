import { type CollectionEntry, getCollection } from 'astro:content';

export async function getPosts() {
	const posts = await getCollection('notes', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date) {
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export function readingMinutes(post: CollectionEntry<'notes'>) {
	// Inline HTML such as diagrams isn't reading material, so it doesn't count.
	const words = (post.body ?? '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 230));
}
