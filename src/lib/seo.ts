import type { ImageMetadata } from 'astro';
import { site } from './config';

/** 拼接绝对地址（Open Graph / canonical 需要绝对 URL） */
export function absoluteUrl(path: string, siteUrl?: string): string {
  const base = (siteUrl ?? site.url).replace(/\/$/, '');
  if (!path) return base + '/';
  if (/^https?:\/\//.test(path)) return path;
  return base + (path.startsWith('/') ? path : '/' + path);
}

/** 图片元数据 → 绝对 URL */
export function imageUrl(image?: ImageMetadata, siteUrl?: string): string | undefined {
  if (!image) return undefined;
  return absoluteUrl(image.src, siteUrl);
}

/** 默认分享图（放 public/og-default.jpg） */
export const DEFAULT_OG = '/og-default.jpg';

export function clamp(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : clean.slice(0, max - 1) + '…';
}

export function plainText(html: string, max = 160): string {
  return clamp(html.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' '), max);
}
