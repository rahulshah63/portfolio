import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../posts';
import { site } from '../site';

export async function GET(context: APIContext) {
	const posts = await getPosts();
	return rss({
		title: `${site.name}: Notes`,
		description: 'Notes and thoughts by Rahul Shah.',
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: `/notes/${post.id}/`,
		})),
	});
}
