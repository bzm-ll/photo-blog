# K. 占位符清单与维护说明

## 一、需要你替换的占位符（按重要性排序）

> 全部集中在 **1 个文件**：`src/lib/config.ts`（第 9、10 条在别处，已单独标出）。
> 替换方法：GitHub 打开文件 → 铅笔图标 → 改 → Commit changes。或者本地改完 push。

| # | 占位符 | 出现位置 | 替换成 | 例子 |
| --- | --- | --- | --- | --- |
| 1 | `[博客名]` | `config.ts` → `site.name.zh` | 中文站名 | 雾中记事 |
| 2 | `[Blog Name]` | `config.ts` → `site.name.en` | 英文站名 | Notes in Fog |
| 3 | `[一句话副标题…]` | `site.tagline.zh` | 一句话定位 | 关于光、雾与海的记录 |
| 4 | `[One-line tagline]` | `site.tagline.en` | 英文副标题 | Photographs of light, fog and sea |
| 5 | `[昵称]` / `[Nickname]` | `site.author` | 你的名字/笔名 | 老周 |
| 6 | `[个人简介…]` | `site.bio.zh` / `.en` | 1–2 句简介（首页与关于页用） | 拍了十年，只留下雾天 |
| 7 | `[邮箱]` | `site.email` | 你的邮箱 | hi@example.com |
| 8 | `[GitHub用户名]` | `site.github`、`site.social` | 你的 GitHub 用户名 | foggy-harbour |
| 9 | `https://example.netlify.app` | `astro.config.mjs` 的 `SITE_URL`、`config.ts` 的 `url`、`public/admin/config.yml` 的 `site_url`/`display_url` | 你的真实网址（3 个文件都要改） | https://foggy-harbour.netlify.app |
| 10 | `[你的Cloudinary云名称]` | `config.ts` → `site.cloudinary.cloudName` | 不用 Cloudinary 就保持 `enabled: false`，不用管 | — |
| 11 | Giscus `repoId` / `categoryId` | `config.ts` → `site.giscus` | 从 giscus.app 复制的两个 ID | `R_kgDO...` |
| 12 | 关于页正文 | `config.ts` → `site.about.zh` / `.en` | 你的自我介绍（Markdown） | 见文件内示例 |
| 13 | 友链 | `config.ts` → `friends` 数组 | 换成真实友站 | `{ name, url, desc: { zh, en } }` |
| 14 | 社交链接 | `config.ts` → `site.social` | 删掉不用的，改成真实的 | — |
| 15 | 示例内容 | `src/content/**/*.md` 12 篇 | 删掉，写自己的 | — |
| 16 | 占位图 | `src/assets/photos/` 23 张 | 换自己的照片 | — |
| 17 | favicon | `public/favicon.svg` | 换成自己的图标（保持文件名，或改 BaseHead 里的引用） | — |
| 18 | 默认分享图 | `public/og-default.jpg` | 1200×630，换成自己的图 | — |

### 快速自检：还有没有没换的占位符

```bash
grep -rn "\[" src/lib/config.ts | head
```

或者直接打开首页，看到任何带方括号的 `[…]` 就是还没换。

> **改完前 9 条，站点就算"完稿"了**。10–18 是锦上添花，可以慢慢来。

## 二、日常维护（每个月只要 5 分钟）

| 频率 | 做什么 |
| --- | --- |
| 每次发内容 | 在后台上传前先压图（长边 2000px） |
| 每月 | Netlify 看一次 Deploys，有没有 Failed |
| 每季度 | GitHub → Code → Download ZIP 备份一次 |
| 每半年 | 检查图片是否堆积过多（仓库 > 800 MB 就该启用 Cloudinary） |
| 每年 | 续费域名（如果买了） |

## 三、常见"我想改…"

| 想改 | 改哪里 | 影响范围 |
| --- | --- | --- |
| 导航顺序 / 增删导航项 | `src/lib/config.ts` → `nav` 数组 | 全站顶栏 + 页脚 |
| "作品"改成"影像" | `src/lib/i18n.ts` → `dict` 里 `nav.works` 的 `['作品','Works']` | 全站文案 |
| 颜色 | `src/styles/global.css` → `@theme` 里的 `--color-*` | 全站 |
| 字号大小 | `global.css` → `--text-h1` 等 clamp 值 | 全站 |
| 卡片图片比例 | 对应组件里的 `aspect-[3/2]` 改成 `aspect-[4/5]` 等 | 该类卡片 |
| 首页精选数量 | `config.ts` → `homeLimit: 6` | 首页 |
| 首页不显示某区块 | `src/views/HomeView.astro` 里注释掉对应 `<section>` | 首页 |
| 加一个"日记"分类 | ① 建 `src/content/diary/` ② `content.config.ts` 加 collection ③ `config.yml` 加一组字段 ④ 建 view + 路由 | 较大改动，建议先问 AI |
| 页脚版权年份 | 自动取当前年份，不用改 | — |

## 四、加一个新分类的完整步骤（进阶）

以"日记 diary"为例：

1. **建目录**：`src/content/diary/`，放一个 `2025-05-12-test.md`
2. **加 schema**：`src/content.config.ts` 里复制 `essays` 那段，改 `base` 为 `./src/content/diary`
3. **加导出**：同文件底部 `export const collections = { works, essays, series, diary };`
4. **加取数函数**：`src/lib/content.ts` 里加 `getDiary()`（照抄 `getEssays`）
5. **加视图**：复制 `EssaysIndexView.astro` → `DiaryIndexView.astro`，改取数函数
6. **加路由**：`src/pages/diary/index.astro` + `src/pages/en/diary/index.astro`（各 3 行）
7. **加导航**：`config.ts` → `nav` 数组加一项；`i18n.ts` → `dict` 加 `nav.diary`
8. **加后台**：`public/admin/config.yml` 复制 essays 那一整段，改 `name`/`folder`/`label`
9. 本地 `npm run build` 验证 → 提交

> 漏第 8 步 = 后台看不到；漏第 2 步 = 构建报错。顺序别乱。

## 五、出问题了怎么办（排查顺序）

```
线上不对劲
├── 打不开 / 5xx        → Netlify Status: https://www.netlifystatus.com/
├── 页面是旧内容         → Netlify → Deploys 看最新一次是否 Published
├── 构建失败 (Failed)    → 点进去看日志最后 10 行，对照 I 文件的错误表
├── 图片裂了            → 检查 md 里的路径是否存在；后台传的图在 src/assets/uploads/
├── 后台登录不了         → Identity 是否 Enable、Git Gateway 是否 Enable
└── 样式全乱            → global.css 是否被误改；本地 npm run build 看是否报错
```

## 六、这套东西的"寿命"

| 依赖 | 风险 | 断了会怎样 |
| --- | --- | --- |
| Netlify | 低（商业公司，免费版长期存在） | 网站下线，但内容在 GitHub，换 Vercel/Cloudflare Pages 半天能迁回 |
| Netlify Identity | **中**（维护模式） | 后台登录不了 → 用 G 里的备选路线，或直接改 GitHub 文件 |
| Decap CMS | 低（开源，功能稳定） | CDN 挂了 → 用 GitHub 网页编辑 |
| Astro | 低（开源） | 版本升级可能有破坏性变更 → 不升级就没事 |
| Giscus | 低 | 评论消失，内容仍在 GitHub Discussions |
| Pagefind | 低（开源，构建时生成） | 搜索失效，其余正常 |

**最重要的一句**：你的照片和文字是**普通文件**，存在你自己的 GitHub 仓库里。任何一家服务停止运营，你都能把整个文件夹拿走，换个地方重新部署。这就是不用闭源建站平台的根本理由。

## 七、需要我继续做什么

跟 AI 说这些话就能接着改（不用懂代码）：

- "把首页的精选改成 4 个" 
- "我想加一个'器材'页面"
- "作品详情页的图片想再大一点，占满整屏"
- "帮我把文案改成英文为主"
- "这篇文章的排版我想加图片并排两栏"
