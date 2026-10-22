# E. 完整项目文件树

共 **105 个源文件**（不含 `node_modules`、`dist` 等生成物）。带 ★ 的是你以后会经常改的，带 ☆ 的可以完全不碰。

```
photo-blog/
├── package.json               ★ 依赖与命令（npm run dev / build / preview）
├── package-lock.json            锁定版本，别手改
├── astro.config.mjs           ★ 站点网址、中英双语、sitemap、Tailwind 插件
├── netlify.toml               ★ 部署配置（构建命令、Node 版本、缓存头）
├── tsconfig.json                TypeScript 配置
├── .gitignore                   不提交 node_modules / dist
│
├── public/                     原样复制到网站根目录的静态文件
│   ├── favicon.svg            ☆ 站点小图标（替换可用同名文件）
│   ├── og-default.jpg         ☆ 分享到微信/X 时的默认图（1200×630）
│   └── admin/
│       ├── index.html           后台入口页（加载 Decap CMS）
│       └── config.yml         ★ 后台字段定义（必须与 content.config.ts 一致）
│
├── scripts/
│   ├── make-placeholders.mjs  ☆ 生成占位图片（一次性，可删）
│   └── make-og.mjs            ☆ 生成默认分享图（一次性，可删）
│
├── src/
│   ├── content.config.ts      ★ 三类内容的结构与校验（Zod schema）
│   │
│   ├── content/               ★★ 你的内容都在这（后台也是写到这里）
│   │   ├── works/
│   │   │   ├── fog-harbour.md        雾港
│   │   │   ├── quiet-coast.md        安静的海岸
│   │   │   ├── ridge-line.md         山脊线
│   │   │   ├── dune-field.md         沙丘
│   │   │   ├── river-mouth.md        河口
│   │   │   └── winter-tower.md       冬日塔楼
│   │   ├── essays/
│   │   │   ├── notes-on-fog.md       关于雾的五条笔记
│   │   │   ├── why-film.md           为什么还在用胶片
│   │   │   └── gear-list.md          器材清单
│   │   └── series/
│   │       ├── coast.md              安静的海岸（order 1）
│   │       ├── cities.md             城市边缘（order 2）
│   │       └── winter.md             冬天的塔（order 3）
│   │
│   ├── assets/
│   │   └── photos/            ★ 本地图片（23 张占位图，可整批替换）
│   │       ├── work-*-cover.jpg      6 张作品封面（3:2）
│   │       ├── work-*-g1..g4.jpg     图集
│   │       ├── essay-cover-1..3.jpg  文章封面（4:3）
│   │       └── series-*.jpg          3 张系列封面（4:5）
│   │
│   ├── lib/                   逻辑层（不含 HTML）
│   │   ├── config.ts          ★★ 你的个人信息、Giscus、友链、导航 —— 第一个要改的文件
│   │   ├── i18n.ts            ★ 界面中英文案、链接本地化、日期格式化
│   │   ├── content.ts           取内容、排序、标签统计、上下篇、年月分组
│   │   ├── seo.ts               绝对网址、摘要截断
│   │   └── markdown.ts          Markdown → HTML
│   │
│   ├── styles/
│   │   └── global.css         ★ 设计规范（颜色/字号/间距/正文排版）
│   │
│   ├── components/            可复用片段
│   │   ├── BaseHead.astro       <head> 里的一切：SEO、OG、JSON-LD、hreflang
│   │   ├── Header.astro         顶栏（导航、搜索、语言、深浅色、汉堡菜单）
│   │   ├── Footer.astro         页脚
│   │   ├── Hero.astro           首页全屏主视觉
│   │   ├── SectionHead.astro    带"查看全部"的区块标题
│   │   ├── WorkCard.astro       作品卡片（3:2）
│   │   ├── EssayCard.astro      文章列表项
│   │   ├── SeriesCard.astro     系列卡片（4:5）
│   │   ├── TagList.astro        标签胶囊
│   │   ├── PrevNext.astro       上一篇 / 下一篇
│   │   ├── MetaRow.astro        拍摄信息（地点/时间/相机/镜头）
│   │   ├── Gallery.astro        图集 + 灯箱（原生 <dialog>，零依赖）
│   │   └── Comments.astro       Giscus 评论
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro    <html> 骨架、深浅色预加载、skip link
│   │
│   ├── views/                 页面主体（路由文件只是薄壳，指向这里）
│   │   ├── HomeView.astro
│   │   ├── WorksIndexView.astro     WorkDetailView.astro
│   │   ├── EssaysIndexView.astro    EssayDetailView.astro
│   │   ├── SeriesIndexView.astro    SeriesDetailView.astro
│   │   ├── TagsIndexView.astro      TagDetailView.astro
│   │   ├── ArchiveView.astro        年月归档
│   │   ├── SearchView.astro         Pagefind 自绘界面
│   │   ├── AboutView.astro          LinksView.astro
│   │   ├── GuestbookView.astro      PrivacyView.astro
│   │   └── NotFoundView.astro
│   │
│   └── pages/                 路由（文件路径 = 网址）
│       ├── index.astro               /
│       ├── works/index.astro         /works/
│       ├── works/[...slug].astro     /works/任意
│       ├── essays/…  series/…  tags/index.astro  tags/[tag].astro
│       ├── archive.astro  search.astro  about.astro  links.astro
│       ├── guestbook.astro  privacy.astro  404.astro
│       ├── robots.txt.ts             /robots.txt
│       └── en/                      /en/ 下的同构副本（16 个，只传 lang="en"）
│
└── docs/                      A–K 全部说明（本目录）
    ├── A-方案总览.md            B-页面结构与导航.md
    ├── C-设计规范.md            D-内容模型.md
    ├── E-文件树.md              F-代码清单.md
    ├── G-后台在线编辑.md        H-图片上传与优化.md
    ├── I-部署上线与更新.md      J-验收清单.md
    └── K-占位符与维护.md
```

## 为什么这样分目录

| 目录 | 只放什么 | 好处 |
| --- | --- | --- |
| `content/` | 纯内容，一行代码都没有 | 备份/迁移 = 复制这个文件夹；后台也只写这里 |
| `assets/` | 图片原文件 | Astro 构建时自动压缩、生成多尺寸，不需要你手动处理 |
| `lib/` | 纯逻辑（取数据、格式化、文案） | 换设计不用动逻辑 |
| `components/` | 可复用的小块 | 改一次卡片，全站生效 |
| `views/` | 页面主体 | 中文页和英文页共用同一份，不会出现"改了中文忘了英文" |
| `pages/` | 只有 3–15 行的薄壳 | 路由一目了然；`en/` 里全是同构副本 |

## 生成物（不要提交、不要手改）

| 目录 | 内容 | 说明 |
| --- | --- | --- |
| `node_modules/` | 依赖 | `npm install` 重建 |
| `.astro/` | Astro 的类型缓存 | 自动生成 |
| `dist/` | 构建产物（85 个页面 + `pagefind/` 索引） | `npm run build` 重建，Netlify 部署的就是它 |
