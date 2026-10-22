/**
 * ⚠️ 站点总配置：这里是你唯一需要改「个人信息」的地方
 * 所有 [方括号] 内容都要换成你自己的，换完就能部署。
 */
export const site = {
  /** 博客名：中文 / 英文 */
  name: { zh: 'Misty-reef', en: 'Misty-reef' },
  /** 一句话副标题 */
  tagline: { zh: '为记录世界的美好', en: 'Recording the beauty of the world' },
  /** 作者昵称 */
  author: { zh: 'Misty-reef', en: 'Misty-reef' },
  /** 个人简介（首页/关于页用） */
  bio: {
    zh: '用照片记录世界的美好。日常拍摄风景、城市与光。',
    en: 'A running record of the beautiful world -- landscape, cities and light.',
  },
  /** 关于页正文（Markdown） */
  about: {
    zh: `## 关于我

这里是 Misty-reef，用照片记录世界的美好。

## 联系方式

- 邮箱：1302536587@qq.com
- GitHub：https://github.com/bzm-ll
- 约稿 / 合作：欢迎邮件联系`,
    en: `## About

I'm Misty-reef. This is where I keep a record of the beautiful world.

## Contact

- Email: 1302536587@qq.com
- GitHub: https://github.com/bzm-ll`,
  },
  /** 联系邮箱 */
  email: '1302536587@qq.com',
  /** GitHub 用户名（用于留言、后台、页脚链接） */
  github: 'bzm-ll',
  /** 站点正式网址：部署后改成你的 Netlify 地址，结尾不要斜杠 */
  url: 'https://foggy-harbour.netlify.app',

  social: [
    { label: 'GitHub', href: 'https://github.com/bzm-ll' },
    { label: 'Email', href: 'mailto:1302536587@qq.com' },
  ],

  /** Giscus 留言（基于 GitHub Discussions，免费） */
  giscus: {
    repo: 'bzm-ll/photo-blog',
    repoId: '',            // 见 docs/03-后台与部署.md 第 3 步
    category: 'Announcements',
    categoryId: '',
    mapping: 'pathname',
    theme: 'preferred_color_scheme',
  },

  /** Cloudinary 图床（可选，默认关闭 = 图片存在仓库里） */
  cloudinary: {
    enabled: false,
    cloudName: '[你的Cloudinary云名称]',
  },

  /** 每页作品数 / 文章数（首页用） */
  homeLimit: 6,
} as const;

/** 导航：key 对应 i18n 字典里的 nav.* */
export const nav = [
  { key: 'nav.works', path: '/works/' },
  { key: 'nav.essays', path: '/essays/' },
  { key: 'nav.series', path: '/series/' },
  { key: 'nav.archive', path: '/archive/' },
  { key: 'nav.about', path: '/about/' },
  { key: 'nav.links', path: '/links/' },
  { key: 'nav.guestbook', path: '/guestbook/' },
] as const;

/** 友链：直接在这里加行即可 */
export const friends = [
  // 复制下面这一行、改掉内容，就是加一个友链：
  // { name: '友站名', url: 'https://example.com', desc: { zh: '一句话介绍', en: 'Short intro' } },
];
