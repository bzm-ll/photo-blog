import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * 内容结构定义。
 * 后台（Decap CMS）的 public/admin/config.yml 必须与这里保持一致：
 * 加字段时，两处都要改。
 */

const seoFields = {
  seo_title_zh: z.string().default(''),
  seo_title_en: z.string().default(''),
  seo_description_zh: z.string().default(''),
  seo_description_en: z.string().default(''),
};

/** 摄影作品 */
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z
      .object({
        title_zh: z.string(),
        title_en: z.string().default(''),
        date: z.coerce.date(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        summary_zh: z.string().default(''),
        summary_en: z.string().default(''),
        cover: image(),
        cover_alt_zh: z.string().default(''),
        cover_alt_en: z.string().default(''),
        /** 图集：每张图带中英双语 alt */
        gallery: z
          .array(
            z.object({
              image: image(),
              alt_zh: z.string().default(''),
              alt_en: z.string().default(''),
            })
          )
          .default([]),
        location_zh: z.string().default(''),
        location_en: z.string().default(''),
        shot_at: z.string().default(''),
        camera: z.string().default(''),
        lens: z.string().default(''),
        tags_zh: z.array(z.string()).default([]),
        tags_en: z.array(z.string()).default([]),
        series: z.string().default(''),
        body_zh: z.string().default(''),
        body_en: z.string().default(''),
        ...seoFields,
      })
      .passthrough(),
});

/** 文章 / 随笔 */
const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: ({ image }) =>
    z
      .object({
        title_zh: z.string(),
        title_en: z.string().default(''),
        date: z.coerce.date(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        summary_zh: z.string().default(''),
        summary_en: z.string().default(''),
        cover: image().optional(),
        cover_alt_zh: z.string().default(''),
        cover_alt_en: z.string().default(''),
        tags_zh: z.array(z.string()).default([]),
        tags_en: z.array(z.string()).default([]),
        body_zh: z.string().default(''),
        body_en: z.string().default(''),
        ...seoFields,
      })
      .passthrough(),
});

/** 摄影系列 / 项目 */
const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
  schema: ({ image }) =>
    z
      .object({
        title_zh: z.string(),
        title_en: z.string().default(''),
        order: z.number().default(99),
        description_zh: z.string().default(''),
        description_en: z.string().default(''),
        cover: image().optional(),
        draft: z.boolean().default(false),
      })
      .passthrough(),
});

export const collections = { works, essays, series };
