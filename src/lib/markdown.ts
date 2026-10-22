import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

/** 把 Markdown 字符串渲染成 HTML（构建时执行，不占浏览器性能） */
export function md(source?: string): string {
  if (!source || !source.trim()) return '';
  return marked.parse(source, { async: false }) as string;
}
