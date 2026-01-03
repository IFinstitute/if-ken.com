// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    id: z.string(),
    date: z.string(), // または z.date()
    category: z.string().optional(), // 入っていないこともある場合は .optional()
  }),
});

export const collections = {
  'projects': projects,
};
