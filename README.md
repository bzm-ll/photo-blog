# [博客名] · 个人摄影博客

黑白灰极简 + 杂志感排版 + 中英双语 + 在线后台。基于 **Astro 7 / Tailwind 4**，部署在 **Netlify** 免费版，内容存 **GitHub**，编辑用 **Decap CMS**。

## 快速开始

```bash
npm install       # 安装依赖（首次）
npm run dev       # 本地预览 http://localhost:4321
npm run build     # 构建（含 Pagefind 搜索索引）
npm run preview   # 预览构建产物
```

> Node 版本需 ≥ 20（推荐 22）。Windows 用户如果 `npm` 报错，用 PowerShell 而不是 CMD。

## 第一步：改成你自己的

只改 **1 个文件** 就能上线：[`src/lib/config.ts`](src/lib/config.ts) —— 博客名、昵称、简介、邮箱、GitHub、Giscus。

完整替换清单见 [`docs/K-占位符与维护.md`](docs/K-占位符与维护.md)。

## 文档

| 文件 | 内容 |
| --- | --- |
| [A · 方案总览](docs/A-方案总览.md) | 技术栈、免费额度、为什么这么选、成本 |
| [B · 页面结构](docs/B-页面结构与导航.md) | 导航图、17 个页面清单、双语策略 |
| [C · 设计规范](docs/C-设计规范.md) | 配色、字号、间距、栅格、图片比例、动效 |
| [D · 内容模型](docs/D-内容模型.md) | 三类内容的全部字段与示例 |
| [E · 文件树](docs/E-文件树.md) | 105 个文件各是干什么的 |
| [F · 代码清单](docs/F-代码清单.md) | 逐文件说明 + 风险分级 |
| [G · 后台在线编辑](docs/G-后台在线编辑.md) | **点按级步骤**：注册→部署→开后台→发第一篇 |
| [H · 图片上传与优化](docs/H-图片上传与优化.md) | 自动压图原理、上传前怎么处理 |
| [I · 部署上线与更新](docs/I-部署上线与更新.md) | 发内容流程、回滚、绑定域名 |
| [J · 验收清单](docs/J-验收清单.md) | 逐项打勾的检查表 |
| [K · 占位符与维护](docs/K-占位符与维护.md) | 要替换什么、日常怎么维护 |

## 目录结构（精简版）

```
src/
├── content/          ← 你的作品/文章/系列（Markdown）
├── assets/photos/    ← 图片
├── lib/config.ts     ← ★ 个人信息
├── styles/global.css ← 设计规范
├── components/       ← 可复用组件
├── views/            ← 页面主体
├── pages/            ← 路由（中文）
└── pages/en/         ← 路由（英文，同构）
public/admin/         ← 后台（Decap CMS）
```

## 示例内容

`src/content/` 里是 12 篇**示例内容**（6 作品 / 3 系列 / 3 文章），配 23 张程序生成的占位图。它们只是让版面看起来完整，**可以全部删掉**，换成你自己的。

## 技术细节

- **图片**：构建时自动转 WebP、生成 480/800/1200/1600 四档、加 `srcset` + `sizes`、懒加载。
- **搜索**：Pagefind 构建时生成静态索引，零服务器；按语言过滤（中文站只搜中文）。
- **双语**：一套内容文件存中英字段，`/en/` 前缀路由；缺英文自动回退中文；`hreflang` 三向声明。
- **SEO**：每页 title/description/canonical/OG/Twitter/JSON-LD（Person / WebSite / Article / BreadcrumbList / ImageObject）+ sitemap + robots。
- **深浅色**：跟随系统，可手动切换，localStorage 记忆，首屏无闪烁。
- **灯箱**：原生 `<dialog>`，零依赖，ESC/点背景关闭。
- **评论**：Giscus（GitHub Discussions），跟着深浅色切换。

## 许可

代码可自由使用。示例照片为程序生成的抽象图，不涉及他人版权。
