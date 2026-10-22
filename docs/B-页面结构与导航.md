# B. 页面结构与导航图

## 导航图（用户视角）

```
首页 /
├── 作品 /works/                    ← 全部作品，大图网格
│   ├── 作品详情 /works/[slug]/      ← 整宽大图 + 图集 + 拍摄信息 + 上下篇 + 评论
│   └── 按系列 /series/[slug]/       ← 该系列下的作品集合
├── 文章 /essays/                   ← 写作/随笔列表
│   └── 文章详情 /essays/[slug]/
├── 系列 /series/                   ← 长期项目的入口卡片
├── 标签 /tags/                     ← 全部标签云
│   ├── 标签详情 /tags/[标签]/        ← 该标签下的作品 + 文章
│   └── （归档页底部有入口）
├── 归档 /archive/                  ← 按 年 / 月 分组的时间线，混合作品与文章
├── 搜索 /search/                   ← Pagefind 全文搜索（顶栏放大镜进入）
├── 关于 /about/                    ← 头像区 + 自我陈述 + 联系方式
├── 友链 /links/                    ← 卡片式友站列表
├── 留言 /guestbook/                ← Giscus 评论区
├── 隐私与版权 /privacy/            ← 页脚进入
├── 404 /404.html                   ← 找不到页面
└── 后台 /admin/                    ← Decap CMS（不在导航里，凭网址进入）
```

英文版是同样的结构，统一加 `/en` 前缀：`/en/`、`/en/works/`、`/en/works/fog-harbour/`……

## 页面清单（13 类必备 + 支撑页）

| # | 页面 | 中文路由 | 英文路由 | 源文件 | 关键内容 |
| --- | --- | --- | --- | --- | --- |
| 1 | 首页 | `/` | `/en/` | `src/views/HomeView.astro` | 全屏主视觉、精选三张、最新作品、系列入口、最近文章、简介条、语言切换 |
| 2 | 作品列表 | `/works/` | `/en/works/` | `WorksIndexView.astro` | 3:2 网格，日期 + 中英标题 |
| 3 | 作品详情 | `/works/[slug]/` | `/en/works/[slug]/` | `WorkDetailView.astro` | 大图、拍摄信息、正文、图集灯箱、系列/标签侧栏、上下篇、评论 |
| 4 | 文章列表 | `/essays/` | `/en/essays/` | `EssaysIndexView.astro` | 横向列表，摘要 + 可选缩略图 |
| 5 | 文章详情 | `/essays/[slug]/` | `/en/essays/[slug]/` | `EssayDetailView.astro` | 阅读宽度 68ch、封面、正文、标签、上下篇、评论 |
| 6 | 系列列表 | `/series/` | `/en/series/` | `SeriesIndexView.astro` | 4:5 竖版卡片 + 作品数量 |
| 7 | 系列详情 | `/series/[slug]/` | `/en/series/[slug]/` | `SeriesDetailView.astro` | 系列说明 + 其下作品网格 |
| 8 | 标签总览 | `/tags/` | `/en/tags/` | `TagsIndexView.astro` | 标签 + 数量 |
| 9 | 标签详情 | `/tags/[标签]/` | `/en/tags/[标签]/` | `TagDetailView.astro` | 该标签下的作品与文章 |
| 10 | 归档 | `/archive/` | `/en/archive/` | `ArchiveView.astro` | 年份 sticky 标题 + 月份分组 |
| 11 | 搜索 | `/search/` | `/en/search/` | `SearchView.astro` | 输入框 + 结果列表 + 高亮摘要 |
| 12 | 关于 | `/about/` | `/en/about/` | `AboutView.astro` | 左栏昵称/联系方式，右栏 Markdown 正文 |
| 13 | 友链 | `/links/` | `/en/links/` | `LinksView.astro` | 卡片网格，来自 `src/lib/config.ts` 的 `friends` |
| 14 | 留言 | `/guestbook/` | `/en/guestbook/` | `GuestbookView.astro` | Giscus 评论 |
| 15 | 隐私与版权 | `/privacy/` | `/en/privacy/` | `PrivacyView.astro` | 版权声明、隐私说明、联系 |
| 16 | 404 | `/404.html` | `/en/404/` | `NotFoundView.astro` | 大字 404 + 回首页 |
| 17 | 后台 | `/admin/` | — | `public/admin/index.html` | Decap 登录与编辑界面 |
| — | robots / sitemap | `/robots.txt` `/sitemap-index.xml` | — | `src/pages/robots.txt.ts` + 插件 | 搜索引擎抓取 |
| — | 搜索索引 | `/pagefind/*` | — | 构建时生成 | Pagefind 资源 |

## 导航行为

- **顶栏固定在顶部**（`sticky`），滚动时半透明 + 毛玻璃，始终有 1px 分隔线。
- 桌面端显示 7 个文字导航（作品/文章/系列/归档/关于/友链/留言），当前页高亮为墨色，其余为灰色。
- 移动端（< 768px）收进汉堡按钮，展开为整屏列表面板，每行 ≥ 48px 可点区域。
- 右侧固定三个功能位：**搜索**（放大镜图标）、**语言切换**（EN / 中文）、**深浅色**（太阳/月亮）；移动端再追加汉堡。
- 语言切换是"镜像"逻辑：`/works/fog-harbour/` ↔ `/en/works/fog-harbour/`，不会跳回首页。
- 页脚：博客名 + 副标题、导航副本、联系方式、版权 + 隐私链接。

## 双语策略

- 中文是默认语言，**不带前缀**（`/`），英文在 `/en/` 下。这样中文访客网址最短。
- 一套内容文件同时存中英文字段（`title_zh` / `title_en`），不是两份文件 —— 后台填一次，两版都能用；缺英文时**自动回退中文**，不会出现空白页。
- 每个页面头部都有 `hreflang` 三向声明（zh-CN / en / x-default），告诉 Google 这是同一页的两个语言版本。
- 搜索结果按语言过滤：中文站只搜中文内容，英文站只搜英文内容。
