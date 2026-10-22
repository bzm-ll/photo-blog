import { getCollection, type CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'works'>;
export type Essay = CollectionEntry<'essays'>;
export type Series = CollectionEntry<'series'>;
export type Lang = 'zh' | 'en';

const byDateDesc = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime();

/** 全部作品（过滤草稿，按日期倒序） */
export async function getWorks(): Promise<Work[]> {
  const items = await getCollection('works', ({ data }) => data.draft !== true);
  return items.sort(byDateDesc);
}

/** 全部文章 */
export async function getEssays(): Promise<Essay[]> {
  const items = await getCollection('essays', ({ data }) => data.draft !== true);
  return items.sort(byDateDesc);
}

/** 全部系列（按 order 再按日期） */
export async function getSeriesList(): Promise<Series[]> {
  const items = await getCollection('series', ({ data }) => data.draft !== true);
  return items.sort((a, b) => a.data.order - b.data.order);
}

export function featuredWorks(works: Work[], limit = 3): Work[] {
  const featured = works.filter((w) => w.data.featured);
  return (featured.length ? featured : works).slice(0, limit);
}

/** 系列 slug → 该系列下的作品 */
export function worksOfSeries(works: Work[], seriesId: string): Work[] {
  return works.filter((w) => w.data.series === seriesId);
}

/** 标签统计 */
export type TagCount = { name: string; slug: string; count: number };

export function tagIndex(
  items: { data: { tags_zh?: string[]; tags_en?: string[] } }[],
  lang: Lang
): TagCount[] {
  const map = new Map<string, number>();
  for (const item of items) {
    const tags = (lang === 'en' ? item.data.tags_en : item.data.tags_zh) ?? [];
    for (const tag of tags) {
      const name = tag.trim();
      if (!name) continue;
      map.set(name, (map.get(name) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, slug: name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh'));
}

/** 该条目在列表中的上一篇 / 下一篇（列表已按日期倒序：index-1 更新，index+1 更旧） */
export function neighbours<T extends { id: string }>(list: T[], id: string) {
  const i = list.findIndex((item) => item.id === id);
  return {
    newer: i > 0 ? list[i - 1] : null,
    older: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
  };
}

/** 按年月分组（归档页） */
export function groupByYearMonth<T extends { date: Date }>(items: T[]) {
  const years = new Map<number, Map<number, T[]>>();
  for (const item of items) {
    const d = new Date(item.date);
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth() + 1;
    if (!years.has(y)) years.set(y, new Map());
    const months = years.get(y)!;
    if (!months.has(m)) months.set(m, []);
    months.get(m)!.push(item);
  }
  return [...years.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, months]) => ({
      year,
      months: [...months.entries()]
        .sort((a, b) => b[0] - a[0])
        .map(([month, list]) => ({ month, list })),
    }));
}
