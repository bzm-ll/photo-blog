// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ⚠️ 部署到 Netlify 后，把下面换成你的正式网址（结尾不要加斜杠）
// 例：'https://your-name.netlify.app'
export const SITE_URL = 'https://foggy-harbour.netlify.app';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',

  // 双语：中文在根路径，英文在 /en/
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      // 404 页不进 sitemap
      filter: (page) => !page.includes('/404'),
      i18n: {
        defaultLocale: 'zh',
        locales: { zh: 'zh-CN', en: 'en-US' },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
