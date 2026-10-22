# H. 图片上传与优化

## 你什么都不用做的那部分（已经自动完成）

你上传原图，构建时 Astro 会自动：

| 自动处理 | 效果 |
| --- | --- |
| 转 **WebP**（质量 82） | 同样画质下体积约为 JPEG 的 60–70% |
| 生成 4 档尺寸：480 / 800 / 1200 / 1600 | 手机只下载 480–800px 的那张 |
| 生成 `srcset` + `sizes` | 浏览器按屏幕宽度挑最合适的一档 |
| 懒加载 | 首屏以下的图滚动到才下载 |
| 读取原始宽高 | 图片加载前占好位，不会"跳版" |
| 加 `alt` | 读屏软件和搜索引擎能读懂 |

实测：一张 3.2 MB 的 6000×4000 原图，手机上实际只下载 **约 90 KB** 的 WebP。

## 你要做的那部分：上传前先压一压

**为什么要压**：构建时要为每张图生成 4 个尺寸，原图越大，构建越慢（免费版每月 300 构建分钟）。长边 2000px 已经完全够用（网页最大也就 1440px 宽）。

| 目标 | 建议 |
| --- | --- |
| 长边 | **1600–2000 px** |
| 单张体积 | **≤ 800 KB**（封面 ≤ 1.5 MB 也行） |
| 格式 | JPEG 或 PNG 都行；有 HEIC（iPhone 默认）先转 JPG |
| 色彩 | sRGB（导出时选 sRGB，别用 Adobe RGB/ProPhoto，否则网页上会发灰） |

### 免费压缩工具（任选一个）

| 工具 | 地址 | 特点 |
| --- | --- | --- |
| **Squoosh** | https://squoosh.app/ | Google 出品，浏览器里就能压，可实时对比画质，不用装软件 |
| **iLoveIMG** | https://www.iloveimg.com/zh-cn/compress-image | 可批量 |
| **ImageOptim** | https://imageoptim.com/mac | Mac 应用，拖进去就压 |
| **XnConvert** | https://www.xnview.com/en/xnconvert/ | Win/Mac/Linux，批量改尺寸+压 |
| 手机自带 | iOS「快捷指令」/ Android「文件」里的压缩 | 应急够用 |

**批量流程（推荐）**：把一组照片放进一个文件夹 → Squoosh 逐张压（或 XnConvert 批处理：长边 2000 + 质量 80 + 转 sRGB）→ 再上传到后台。

## 命名与替代文字（别跳过）

### 文件名

```
✅ fog-harbour-cover.jpg     用英文、小写、连字符
✅ 2025-03-qingdao-01.jpg   带日期和地点，方便排序
❌ 微信图片_20250312154523.jpg   中文+空格，某些系统会出问题
❌ IMG_0001.JPG                 无法检索
```

> 后台里上传的图会存到 `src/assets/uploads/`，文件名就是原文件名。改成英文名再上传，比上传后改名省事。

### 替代文字（alt）

每张图都有 `alt_zh` / `alt_en` 两个框，写"这张图拍的是什么"，不写"图片"两个字：

| ❌ 不好 | ✅ 好 |
| --- | --- |
| 图片1 | 浓雾中的港口吊机，远处只有轮廓 |
| 照片 | 退潮后的沙滩，两道平行的车辙延伸到海里 |
| cover | 清晨六点的湖面，薄冰上映着对岸的树林 |

- 读屏软件会把这句话读给视障访客听；
- Google 图片搜索靠它理解图片；
- 社交平台分享时也用它当说明。
- 留空不会报错（会自动用标题代替），但会白白丢掉一个免费的 SEO 加分项。

## 三种存图方案

### 方案 1：存仓库（默认，推荐）

- 图放 `src/assets/uploads/`（后台自动）或 `src/assets/photos/`（手动）
- **优点**：免费、备份和网站同源、迁移时一个文件夹带走
- **限制**：GitHub 单仓库建议 **< 1 GB**，单文件 < 100 MB；Netlify 免费版每月 100 GB 流量
- **经验值**：按每张压到 500 KB 算，1 GB ≈ 2000 张。个人博客每月传 20 张，能用 8 年。

### 方案 2：Cloudinary（图多/想自动裁切时）

免费额度近年调整过（从 25 GB 存储改为按 credits 计费），**具体数字请以 https://cloudinary.com/pricing 为准**，开通前确认当月政策。

适合的场景：
- 一个系列几十张图，想按设备自动给不同裁切（竖构图在手机上裁成方图）；
- 想用 `f_auto,q_auto` 让 CDN 自动选 AVIF/WebP。

接入方式（项目里已留好开关，默认关闭）：

```ts
// src/lib/config.ts
cloudinary: { enabled: false,  // ← 改成 true
              cloudName: '你的云名称' }
```

> ⚠️ 本项目的图片主要由 Astro 在**构建时**处理。切到 Cloudinary 意味着要在 Markdown 里直接写 Cloudinary URL，构建期优化就不再生效。**除非你确实遇到仓库体积问题，否则不建议换。**

### 方案 3：其他图床

不建议。免费图床（如某些国内图床）经常忽然关闭外链，五年后你的文章会全是裂图。存仓库是最不容易失效的。

## 想要 AVIF（更小，但构建更慢）

AVIF 比 WebP 再小 20–30%，但编码慢 3–5 倍。构建时间会明显变长，免费版构建分钟有限。

默认**没开**。要开的话，把组件的 `format="webp"` 改成 `format="avif"`（一次全站生效）：

```
src/components/WorkCard.astro
src/components/Gallery.astro
src/components/Hero.astro
src/components/EssayCard.astro
src/components/SeriesCard.astro
```

建议：**先保持 WebP**。等你的图超过 300 张、觉得加载慢时再考虑。

## 视频

目前不支持自动处理视频。想放视频，用 YouTube / Bilibili 的 iframe 嵌进 Markdown 正文：

```html
<iframe src="https://www.youtube.com/embed/视频ID" title="标题"
        width="100%" height="420" loading="lazy" frameborder="0" allowfullscreen></iframe>
```

## 一张图从相机到网站的完整路径

```
相机/手机原图 (6000×4000, 12 MB)
        ↓  导出为 JPG、sRGB、长边 2000
本地图 (2000×1333, 700 KB)
        ↓  后台上传
GitHub 仓库 src/assets/uploads/xxx.jpg
        ↓  Netlify 构建（约 20–60 秒/张）
dist/_astro/xxx.webp  ← 4 个尺寸 × WebP
        ↓  访客打开页面
手机下载 480px 版本 ≈ 60–90 KB
```
