import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { sketchNames } from './sketches';

// Each Markdown file in src/content/notes/ becomes a post at /notes/<file-name>/.
const notes = defineCollection({
	loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		// Spot illustration for the post card and header. See src/sketches.ts for the options.
		illustration: z.enum(sketchNames).default('notebook'),
		// Drafts show up in `npm run dev` but are left out of the built site.
		draft: z.boolean().default(false),
	}),
});

export const collections = { notes };
