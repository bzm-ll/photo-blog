# D. 内容模型与字段表

三类内容，都是**一个 Markdown 文件 = 一条内容**，放在 `src/content/` 下。文件名（不含 `.md`）就是网址里的 slug。

```
src/content/
├── works/     作品：fog-harbour.md  →  /works/fog-harbour/
├── essays/    文章：notes-on-fog.md →  /essays/notes-on-fog/
└── series/    系列：coast.md        →  /series/coast/
```

> **命名建议**：slug 用小写英文 + 连字符（`winter-tower`），不要用中文或空格。后台新建时会自动从标题生成，记得改成英文。

## 1. 作品 works

| 字段 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| `title_zh` | 文本 | ✅ | — | 中文标题 |
| `title_en` | 文本 | — | `""` | 英文标题，空则沿用中文 |
| `date` | 日期 | ✅ | — | 发布日期，决定排序与归档 |
| `featured` | 布尔 | — | `false` | 首页精选（取最新的 3 个） |
| `draft` | 布尔 | — | `false` | `true` = 草稿，不生成页面 |
| `summary_zh` / `summary_en` | 文本 | — | `""` | 列表/搜索摘要，1–2 句 |
| `cover` | 图片 | ✅ | — | 封面，建议 3:2、长边 ≤ 2000px |
| `cover_alt_zh` / `cover_alt_en` | 文本 | — | `""` | 封面的替代文字（读屏 + SEO） |
| `gallery` | 对象数组 | — | `[]` | 图集，每项含 `image` / `alt_zh` / `alt_en` |
| `location_zh` / `location_en` | 文本 | — | `""` | 拍摄地点 |
| `shot_at` | 文本 | — | `""` | 拍摄时间（自由文本，如 `2024-03`） |
| `camera` | 文本 | — | `""` | 相机，如 `Leica M6` |
| `lens` | 文本 | — | `""` | 镜头，如 `35mm f/2` |
| `tags_zh` / `tags_en` | 文本数组 | — | `[]` | 标签，中英各一套（会生成 `/tags/…` 页面） |
| `series` | 文本 | — | `""` | 所属系列的 slug，如 `coast` |
| `body_zh` / `body_en` | Markdown | — | `""` | 正文 |
| `seo_title_zh` / `seo_title_en` | 文本 | — | `""` | 留空则用标题 |
| `seo_description_zh` / `seo_description_en` | 文本 | — | `""` | 留空则用摘要 |

**示例**（`src/content/works/fog-harbour.md`）：

```yaml
---
title_zh: 雾港
title_en: Fog Harbour
date: 2025-05-12
featured: true
draft: false
summary_zh: 清晨五点的港口，能见度不足五十米。
summary_en: Five in the morning, visibility under fifty metres.
cover: ../../assets/photos/work-fog-cover.jpg
cover_alt_zh: 浓雾中的港口吊机剪影
cover_alt_en: Silhouette of harbour cranes in heavy fog
gallery:
  - image: ../../assets/photos/work-fog-g1.jpg
    alt_zh: 雾中的水面
    alt_en: Water surface in fog
location_zh: 青岛
shot_at: 2025-03
camera: Leica M6
lens: 35mm f/2
tags_zh: [黑白, 雾, 港口]
tags_en: [monochrome, fog, harbour]
series: coast
---

正文写在这里，支持 Markdown：**加粗**、`代码`、> 引用、- 列表。
```

> 注意：`gallery` 只能出现一次，多个图片都在同一个列表里。

## 2. 文章 essays

和作品几乎相同，差别：**没有 gallery / 拍摄信息 / series**，`cover` 可选。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title_zh` / `title_en` | 文本 | ✅ / — | 标题 |
| `date` | 日期 | ✅ | 发布日期 |
| `featured` | 布尔 | — | 首页推荐（预留） |
| `draft` | 布尔 | — | 草稿开关 |
| `summary_zh` / `summary_en` | 文本 | — | 摘要 |
| `cover` | 图片 | — | 可选封面（4:3） |
| `cover_alt_zh` / `cover_alt_en` | 文本 | — | 替代文字 |
| `tags_zh` / `tags_en` | 文本数组 | — | 标签 |
| `body_zh` / `body_en` | Markdown | — | 正文 |
| `seo_*` | 文本 | — | 同作品 |

## 3. 系列 series

| 字段 | 类型 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- | --- |
| `title_zh` / `title_en` | 文本 | ✅ / — | — | 系列名 |
| `order` | 数字 | — | `99` | 排序，小的在前 |
| `description_zh` / `description_en` | 文本 | — | `""` | 系列说明 |
| `cover` | 图片 | — | — | 可选封面（4:5）；留空则用首字大字代替 |
| `draft` | 布尔 | — | `false` | 草稿开关 |

**作品与系列的关联**：作品的 `series` 填系列的**文件名**（如 `coast`）。关联是单向的 —— 系列页会反查 `works` 里 `series === 自己` 的条目，所以新建系列后不用改任何作品。

## 4. 站点级配置（不是 Markdown）

| 位置 | 内容 |
| --- | --- |
| `src/lib/config.ts` → `site` | 博客名、副标题、昵称、简介、关于页正文、邮箱、GitHub、网址、社交链接、Giscus、Cloudinary |
| `src/lib/config.ts` → `nav` | 导航项（增删页面时改这里） |
| `src/lib/config.ts` → `friends` | 友链（直接加行） |
| `src/lib/i18n.ts` → `dict` | 界面文案的中英对照（想改"作品"叫"影像"，只改这里） |

## 5. 字段校验

所有字段在构建时由 `src/content.config.ts` 里的 Zod schema 校验。写错了（比如漏了 `cover`、日期格式不对）**构建会失败并告诉你哪个文件哪一行**，不会悄悄发布一个坏页面。这是 Markdown + schema 比纯 HTML 手写强的地方。
