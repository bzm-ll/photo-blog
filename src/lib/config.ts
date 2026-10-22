/**
 * ⚠️ 站点总配置：这里是你唯一需要改「个人信息」的地方
 * 所有 [方括号] 内容都要换成你自己的，换完就能部署。
 */
export const site = {
  /** 博客名：中文 / 英文 */
  name: { zh: '[博客名]', en: '[Blog Name]' },
  /** 一句话副标题 */
  tagline: { zh: '[一句话副标题，例如：关于光、雾与城市的记录]', en: '[One-line tagline]' },
  /** 作者昵称 */
  author: { zh: '[昵称]', en: '[Nickname]' },
  /** 个人简介（首页/关于页用） */
  bio: {
    zh: '[个人简介：2-3 句话介绍你是谁、拍什么、为什么拍。例如：独立摄影师，长期记录东亚城市的边缘地带。作品曾发表于……]',
    en: '[Short bio: who you are, what you shoot, why.]',
  },
  /** 关于页正文（Markdown） */
  about: {
    zh: `## 关于我

这里是 [昵称]，[个人简介]。

我使用 [相机型号] 拍摄，主要关注 [主题]。

## 联系方式

- 邮箱：[邮箱]
- Instagram：[@你的账号]
- 约稿 / 合作：欢迎邮件联系`,
    en: `## About

I'm [Nickname]. [Short bio].

## Contact

- Email: [email]
- Instagram: [@handle]`,
  },
  /** 联系邮箱 */
  email: '[邮箱]',
  /** GitHub 用户名（用于留言、后台、页脚链接） */
  github: '[GitHub用户名]',
  /** 站点正式网址：部署后改成你的 Netlify 地址，结尾不要斜杠 */
  url: 'https://bzm-photo.netlify.app',

  social: [
    { label: 'GitHub', href: 'https://github.com/[GitHub用户名]' },
    { label: 'Instagram', href: 'https://instagram.com/[@账号]' },
    { label: 'Email', href: 'mailto:[邮箱]' },
  ],

  /** Giscus 留言（基于 GitHub Discussions，免费） */
  giscus: {
    repo: '[GitHub用户名]/[仓库名]',
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
  { name: '[友站名 1]', url: 'https://example.com', desc: { zh: '[一句话介绍]', en: '[Short intro]' } },
  { name: '[友站名 2]', url: 'https://example.com', desc: { zh: '[一句话介绍]', en: '[Short intro]' } },
  { name: '[友站名 3]', url: 'https://example.com', desc: { zh: '[一句话介绍]', en: '[Short intro]' } },
];
