export type Lang = 'zh' | 'en';

export const LANGS: Lang[] = ['zh', 'en'];
export const HTML_LANG: Record<Lang, string> = { zh: 'zh-CN', en: 'en' };
export const OG_LOCALE: Record<Lang, string> = { zh: 'zh_CN', en: 'en_US' };

/** 双语界面文案：[中文, English] */
const dict = {
  'nav.home': ['首页', 'Home'],
  'nav.works': ['作品', 'Works'],
  'nav.essays': ['文章', 'Journal'],
  'nav.series': ['系列', 'Series'],
  'nav.archive': ['归档', 'Archive'],
  'nav.about': ['关于', 'About'],
  'nav.links': ['友链', 'Links'],
  'nav.guestbook': ['留言', 'Guestbook'],
  'nav.search': ['搜索', 'Search'],
  'nav.tags': ['标签', 'Tags'],
  'nav.privacy': ['隐私与版权', 'Privacy & Rights'],
  'nav.admin': ['后台管理', 'Admin'],

  'home.hero': ['精选', 'Featured'],
  'home.featured': ['精选作品', 'Selected Works'],
  'home.latestWorks': ['最新作品', 'Latest Works'],
  'home.series': ['摄影系列', 'Series'],
  'home.journal': ['最近写作', 'Journal'],
  'home.about': ['关于我', 'About'],
  'home.viewAll': ['查看全部', 'View all'],
  'home.scroll': ['向下浏览', 'Scroll'],

  'works.title': ['作品', 'Works'],
  'works.intro': ['以影像为主的记录，按时间倒序排列。', 'Image-led records, newest first.'],
  'works.empty': ['还没有作品，去后台新建第一篇吧。', 'No works yet.'],

  'essays.title': ['文章', 'Journal'],
  'essays.intro': ['写作、随笔与拍摄手记。', 'Notes, essays and field logs.'],
  'essays.empty': ['还没有文章。', 'No entries yet.'],

  'series.title': ['系列', 'Series'],
  'series.intro': ['按照项目长期拍摄的影像集合。', 'Long-term projects, grouped.'],
  'series.count': ['件作品', 'works'],

  'tags.title': ['标签', 'Tags'],
  'tags.intro': ['按主题浏览全部作品与文章。', 'Browse everything by topic.'],
  'tags.empty': ['暂时没有标签。', 'No tags yet.'],

  'archive.title': ['归档', 'Archive'],
  'archive.intro': ['按年份与月份浏览。', 'Browse by year and month.'],

  'search.title': ['搜索', 'Search'],
  'search.placeholder': ['搜索作品、文章、系列……', 'Search works, journal, series…'],
  'search.hint': ['输入关键词后按回车。搜索索引在网站构建后才会生成。', 'Type a keyword and press Enter. The index is generated at build time.'],
  'search.loading': ['正在搜索…', 'Searching…'],
  'search.noResults': ['没有找到相关内容。', 'No results found.'],
  'search.results': ['条结果', 'results'],

  'post.published': ['发布', 'Published'],
  'post.updated': ['更新', 'Updated'],
  'post.location': ['地点', 'Location'],
  'post.shotAt': ['拍摄时间', 'Shot'],
  'post.camera': ['相机', 'Camera'],
  'post.lens': ['镜头', 'Lens'],
  'post.tags': ['标签', 'Tags'],
  'post.series': ['所属系列', 'Series'],
  'post.gallery': ['图集', 'Gallery'],
  'post.prev': ['上一篇', 'Previous'],
  'post.next': ['下一篇', 'Next'],
  'post.back': ['返回列表', 'Back to list'],
  'post.readMore': ['阅读全文', 'Read'],

  'comments.title': ['留言讨论', 'Comments'],
  'comments.hint': ['评论由 Giscus 提供，需用 GitHub 账号登录。', 'Powered by Giscus. Sign in with GitHub to comment.'],
  'comments.setup': ['留言功能尚未配置：请先在 src/lib/config.ts 填入 giscus 参数。', 'Comments are not configured yet.'],

  'guestbook.title': ['留言', 'Guestbook'],
  'guestbook.intro': ['欢迎留下任何想法：拍摄建议、合作意向、或者只是打个招呼。', 'Say hello, share feedback, or talk about a collaboration.'],

  'links.title': ['友链', 'Links'],
  'links.intro': ['一些我常读的网站与创作者。', 'Sites and makers I keep coming back to.'],

  'about.title': ['关于', 'About'],
  'about.contact': ['联系', 'Contact'],

  'footer.rights': ['保留所有权利', 'All rights reserved'],
  'footer.built': ['由 Astro 构建 · 托管于 Netlify', 'Built with Astro · Hosted on Netlify'],
  'footer.privacy': ['隐私与版权', 'Privacy & Rights'],
  'footer.top': ['回到顶部', 'Back to top'],

  'notfound.title': ['页面不存在', 'Page not found'],
  'notfound.desc': ['这个地址可能已经失效，或者从来没有存在过。', 'This page may have moved, or never existed.'],
  'notfound.home': ['回到首页', 'Back home'],

  'lang.switch': ['EN', '中文'],
  'theme.toggle': ['切换深色 / 浅色', 'Toggle dark mode'],
  'menu.open': ['打开菜单', 'Open menu'],
  'menu.close': ['关闭菜单', 'Close menu'],
  'common.more': ['继续阅读', 'Continue'],
} as const;

export type DictKey = keyof typeof dict;

export function t(lang: Lang, key: DictKey): string {
  const pair = dict[key];
  return lang === 'en' ? pair[1] : pair[0];
}

export function isLang(value: string): value is Lang {
  return value === 'zh' || value === 'en';
}

/** 取双语字段，英文缺失时回退中文 */
export function pick(lang: Lang, zh?: string, en?: string): string {
  if (lang === 'en') return en && en.trim() ? en : zh ?? '';
  return zh && zh.trim() ? zh : en ?? '';
}

/** 本地化链接：/works/ → /en/works/ */
export function href(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : '/' + path;
  if (lang === 'zh') return clean;
  return clean === '/' ? '/en/' : '/en' + clean;
}

/** 当前路径 → 另一种语言的同一页面 */
export function sibling(lang: Lang, pathname: string): { lang: Lang; path: string } {
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  const base = isEn ? pathname.slice(3) || '/' : pathname;
  if (isEn) return { lang: 'zh', path: base };
  return { lang: 'en', path: base === '/' ? '/en/' : '/en' + base };
}

export function formatDate(lang: Lang, date: Date): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'zh-CN', {
    year: 'numeric',
    month: lang === 'en' ? 'short' : '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Shanghai',
  }).format(d);
}

export function formatDateShort(lang: Lang, date: Date): string {
  const d = new Date(date);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  if (lang === 'en') {
    return new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d);
  }
  return `${y}.${m}`;
}
