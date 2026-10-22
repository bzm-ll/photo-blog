# C. 设计规范

> 所有数值都在 `src/styles/global.css` 的 `@theme` 里，改一处全站生效。下面表格是"契约"，改之前先想清楚。

## 1. 配色

黑白 + 高级灰，**只有这些颜色**，不引入任何彩色强调色（唯一例外：社交链接用系统默认的下划线色）。

### 浅色（默认）

| 角色 | 变量 | 值 | 用在哪 |
| --- | --- | --- | --- |
| 纸白（页面底色） | `--color-paper` | `#FAFAF8` | body 背景 |
| 次级纸白 | `--color-paper-2` | `#F2F1EC` | 图片占位、hover 底色、代码块底 |
| 三级纸白 | `--color-paper-3` | `#E9E7E0` | 首屏图未加载时的底色 |
| 墨黑（主文字） | `--color-ink` | `#0A0A0A` | 标题、正文重点、按钮底 |
| 次墨 | `--color-ink-2` | `#1C1C1A` | 正文段落 |
| 中灰（次要文字） | `--color-mute` | `#6E6E68` | 摘要、导航未选中、页脚 |
| 浅灰（最弱） | `--color-mute-2` | `#9C9C94` | 日期、编号、辅助标签 |
| 发丝线 | `--color-line` | `#E3E1DA` | 1px 分隔线、边框 |
| 深一档的线 | `--color-line-2` | `#CFCDC5` | 下划线、次要边框 |
| 暖灰（点缀） | `--color-accent` | `#8B7F6B` | 极少使用（如需要强调的元信息） |

### 深色

| 角色 | 变量 | 值 |
| --- | --- | --- |
| 底 | `--color-paper` | `#0D0D0C` |
| 次级底 | `--color-paper-2` | `#151513` |
| 三级底 | `--color-paper-3` | `#1D1D1A` |
| 主文字 | `--color-ink` | `#F6F5F1` |
| 次文字 | `--color-ink-2` | `#E4E2DC` |
| 中灰 | `--color-mute` | `#A3A29B` |
| 浅灰 | `--color-mute-2` | `#7C7B74` |
| 线 | `--color-line` | `#2A2A27` |
| 线 2 | `--color-line-2` | `#3B3B35` |
| 暖灰 | `--color-accent` | `#B6AB97` |

**切换方式**：`<html class="dark">`。默认跟随系统（`prefers-color-scheme`），用户点过切换按钮后记在 `localStorage`，**首屏渲染前**就应用，不会闪白。实现见 `src/layouts/BaseLayout.astro` 里的 inline script。

**对比度**：墨/纸 `#0A0A0A` on `#FAFAF8` ≈ 19:1；中灰/纸 ≈ 5.2:1（正文次要信息达标 AA）；浅灰只用于 ≥ 12px 且非关键的编号/日期。

## 2. 字体与字号

不使用 Google Fonts（国内加载常失败）。全部用系统字体栈：

```css
--font-serif: "Songti SC", "Noto Serif CJK SC", "Source Han Serif SC",
              "Noto Serif SC", ui-serif, Georgia, "Times New Roman", serif;
--font-sans:  ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI",
              "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif;
--font-mono:  ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace;
```

- **标题用衬线**（宋体系）→ 杂志感、克制。`h1–h4` 统一 `font-weight: 400`（细体更有高级感，靠字号和留白建立层级，不靠加粗）。
- **正文用无衬线**，行高 1.8，适合中文长时间阅读。
- **元信息用等宽**（日期、编号、标签、导航）→ 排版上的"技术感"细节。

| 级别 | 变量 | 值（流体） | 用在哪 |
| --- | --- | --- | --- |
| 超大标题 | `--text-display` | `clamp(2.6rem, 7vw, 5.6rem)`，行高 0.96，字距 -0.03em | 首页主视觉、404 |
| 页面大标题 | `--text-hero` | `clamp(1.9rem, 4.4vw, 3.2rem)`，行高 1.08 | 详情页标题 |
| 一级标题 | `--text-h1` | `clamp(1.75rem, 3.2vw, 2.5rem)`，行高 1.16 | 各列表页 h1 |
| 二级标题 | `--text-h2` | `clamp(1.3rem, 2.1vw, 1.75rem)`，行高 1.28 | 区块标题、正文 h2 |
| 三级标题 | `--text-h3` | `clamp(1.05rem, 1.5vw, 1.25rem)`，行高 1.4 | 卡片标题、正文 h3 |
| 正文 | `--text-body` | `1.0625rem`(17px)，行高 1.8 | 段落 |
| 元信息 | `--text-meta` | `0.75rem`(12px)，字距 0.14em，大写 | 日期、标签、导航、图片编号 |

> 移动端不用单独设字号 —— `clamp()` 已按视口宽度连续缩放，这是少写一半媒体查询的关键。

## 3. 间距与版心

| 项 | 值 | 说明 |
| --- | --- | --- |
| 最大内容宽度 | `1440px` (`.container-page`) | 再宽就用留白兜住 |
| 左右内边距 | 手机 `20px` / ≥768px `40px` / ≥1280px `56px` | 见 `.container-page` |
| 正文阅读宽度 | `68ch` (`.measure`) | 一行约 30–38 个中文字，最舒服的区间 |
| 区块垂直节奏 | 小 `1rem` / 中 `2rem` / 大 `4rem` / 超大 `6rem` | 用 Tailwind 的 `mt-4 / mt-8 / mt-16 / mt-24` |
| 页脚上边距 | `6rem` 且带 1px 上边线 | 与正文明确切开 |

**间距原则**：宁大勿小。图片之间 16–24px，区块之间 64–96px。留白是这个设计的主角，不要为了"多放点内容"去压缩。

## 4. 栅格

- 桌面：**12 栏**，栏间距 32px。首页精选用 `md:col-span-4` ×3；文章详情用 `md:col-span-8` 正文 + `md:col-span-4` 侧栏。
- 平板（≥768px）：作品网格 2 列 → 3 列（≥1024px）。
- 手机：**单列**，图片满宽。图集用 2 列（`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`），每 5 张的第 1 张跨 2 栏，制造节奏。

## 5. 图片比例（统一，避免花哨）

| 用途 | 比例 | 说明 |
| --- | --- | --- |
| 作品封面 / 卡片 | **3:2** | 135 画幅的经典比例 |
| 系列封面 | **4:5** | 竖版，让系列区有变化 |
| 图集 | 原始比例（`object-cover` 裁切） | 灯箱里看完整图 |
| 文章封面 | 4:3 | 较小、次要 |
| 社交分享图 | 1200×630 | `public/og-default.jpg` |
| 首屏主视觉 | 100vw × `72svh`（手机）/ `78svh`（桌面），最小 480px | 用 `svh` 避免手机上地址栏跳动 |

**图片规则**：`loading="lazy"`（首屏除外）、`decoding="async"`、构建时转 **WebP**（质量 82）、自动生成 480/800/1200/1600 多尺寸 + `srcset` + `sizes`，手机只下 480–800px 的版本。AVIF 需要额外配置且构建更慢，默认不开（见 H 文件说明怎么开）。

## 6. 卡片

所有卡片 = **图片 + 标题 + 元信息** 三段式，没有阴影、没有圆角、没有边框包裹（用 1px 分隔线代替）。

```
┌─────────────────┐
│                 │  ← 3:2 图片，overflow hidden
│     image       │
└─────────────────┘
标题（衬线，h3）            日期（等宽 10px 浅灰）
English subtitle（11px 大写 字距 0.14em 浅灰）
```

- 图片容器 hover 时内部图片缩放到 **1.02**（500ms 缓动 `cubic-bezier(0.22,1,0.36,1)`），容器本身不动。
- 标题 hover 出现下划线（`background-size` 从 0% → 100%，250ms），文字不移动。
- 整卡可点（`<a>` 包裹），焦点环 2px 墨色。

## 7. 按钮

只有两种，**高度 44px 起步**（手指可点）：

| 类型 | 样式 | 用法 |
| --- | --- | --- |
| 主按钮 `.btn` | 墨底纸字，1px 墨边 | 主要操作（回首页） |
| 次按钮 `.btn-ghost` | 透明底墨字，1px 墨边 | 并列的次要操作 |

- 文字 13px、大写、字距 0.08em。
- hover 时**底与字反色**（透明→墨底，墨底→透明），200ms。
- 没有圆角、没有阴影、没有渐变。

## 8. 导航与页脚

- 顶栏高 56px（手机）/ 64px（桌面），`sticky top-0`，`bg-paper/90` + `backdrop-blur-md`，底部 1px 线。
- 导航文字 11px、大写、字距 0.16em；选中 `--color-ink`，未选中 `--color-mute`，hover 变墨色（无下划线，避免和卡片链接混淆）。
- 页脚三段：左（博客名 + 副标题）、中（导航副本）、右（社交/联系/隐私），手机堆叠。底行版权用 12px 浅灰。

## 9. 动效（克制清单）

| 元素 | 动效 | 时长 |
| --- | --- | --- |
| 卡片图片 | scale 1 → 1.02 | 500ms |
| 标题下划线 | background-size 0 → 100% | 250ms |
| 按钮 | 颜色反转 | 200ms |
| 导航/页脚链接 | 颜色过渡 | 150–200ms |
| 灯箱 | 直接出现（无缩放动画） | 0ms |

**没有**：滚动视差、入场淡入、数字滚动、鼠标跟随、3D 翻转。`prefers-reduced-motion` 时全部动效降为 0.001ms。

## 10. 移动端规则

| < 768px 的约定 | 做法 |
| --- | --- |
| 导航 | 汉堡 → 全屏面板，行高 ≥ 48px |
| 首屏大图 | `72svh`，标题 max 4 行，不得溢出 |
| 网格 | 全部单列；图集 2 列 |
| 字号 | 由 `clamp` 自动缩小，最小正文 17px（不缩小！） |
| 可点区域 | 所有链接/按钮 ≥ 44×44px |
| 横向滚动 | 禁止（`overflow-x` 不出现） |
| 图片 | 满宽，不裁成小方块 |
| 灯箱 | 支持点击背景/ESC 关闭 |

## 11. 无障碍

- 语义标签：`header/nav/main/footer/article/figure/figcaption/time`。
- 所有图片必须有 `alt`（来自 `cover_alt_zh`/`cover_alt_en`；留空时自动回退标题，不会输出空 alt）。
- 跳转链接（Skip to content）在键盘 Tab 时出现。
- 焦点可见：2px 墨色 outline，偏移 3px。
- 对比度：正文 ≥ 7:1，辅助文字 ≥ 4.5:1。
- `aria-current="page"` 标出当前导航项；`aria-expanded` 标出菜单状态。
