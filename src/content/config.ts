import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    type: z.enum(['case-study', 'build-log', 'essay', 'archive']),
    stack: z.array(z.string()).default([]),
    github: z.string().optional(),
    demo: z.string().optional(),
    summary: z.string(),
    projectName: z.string().optional(), // short project name e.g. "Happy Campers" (display only)
    project: z.string().optional(),     // series/join key linking build-logs to their case study (e.g. 'portfolio')
    course: z.string().optional(),      // archive: course name e.g. "ENC3254 Writing in the Disciplines"
    retrospective: z.string().optional(), // archive: slug of the related retrospective post
  }).superRefine((data, ctx) => {
    if (data.type === 'build-log' && !data.project) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'build-log posts must set `project` — it is the series key that ties logs together and to their case study.',
        path: ['project'],
      });
    }
  }),
});

export const collections = { blog };
