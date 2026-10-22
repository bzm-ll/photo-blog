# G. 后台在线编辑：点击级步骤

> 目标：做完这一份，你可以在浏览器里打开 `你的网址/admin/`，像写公众号一样发作品、传照片，点"Publish"后网站自动更新。
> 全程免费，不需要命令行（除非你想在本地看效果）。
> 预计 30–40 分钟，其中大部分是在等邮件和等部署。

---

## 第 0 步：先准备好这三样

| 需要 | 说明 |
| --- | --- |
| 一个邮箱 | 用来收 Netlify 的邀请邮件，QQ 邮箱/Gmail 都行 |
| GitHub 账号 | 没有就现注册，第 1 步 |
| 项目文件夹 | 你手上的 `photo-blog/`，**不要**包含 `node_modules` 和 `dist`（这两个文件夹很大且能重新生成） |

---

## 第 1 步：注册 GitHub（已有账号跳到第 2 步）

1. 打开 **https://github.com/signup**
2. 依次填：邮箱 → 密码（≥ 15 位或 ≥ 8 位含数字）→ 用户名（英文，会成为你网址的一部分，如 `foggy-harbour`）
3. 收到验证码邮件 → 填入 → 完成人机验证
4. 选 **Free** 计划（默认就是，不用填信用卡）

> 用户名以后可以改，但会导致仓库地址变化，建议一次想好。

---

## 第 2 步：新建仓库

1. 打开 **https://github.com/new**
2. **Repository name** 填 `photo-blog`（这是仓库名，和网址无关，可以随意）
3. **Description** 可留空
4. 选 **Public**（公开）
   - 为什么选公开：Giscus 留言需要一个公开仓库存评论；公开仓库也不占用私有仓库额度。
   - 介意代码公开？代码本身没有隐私，隐私在 `src/lib/config.ts` 里的邮箱 —— 那个本来就要展示在"关于"页。
5. **不要**勾选 "Add a README file" / ".gitignore" / "license"（我们自己的文件里已经有了，勾了会冲突）
6. 点绿色按钮 **Create repository**

---

## 第 3 步：把项目文件传上去（最关键的一步）

上传前先确认本地文件夹长这样（**第一层**）：

```
photo-blog/
├── astro.config.mjs
├── netlify.toml
├── package.json
├── public/
├── src/
└── ...
```

⚠️ 不要出现 `photo-blog/photo-blog/src` 这种双层嵌套 —— GitHub 里应该直接看到 `src`、`public`、`package.json`。

### 方式 A：网页拖拽（不用装任何软件，推荐）

1. 在刚创建的仓库页面，点 **Add file ▾ → Upload files**
2. 打开本地 `photo-blog` 文件夹，**全选里面的所有文件和文件夹**（Ctrl/Cmd + A），拖进浏览器虚线框
   - GitHub 网页一次最多 **100 个文件**。本项目约 107 个，超了会提示。
   - 分两批：第一批拖 `src` 文件夹 + 根目录的配置文件；第二批拖 `public`、`scripts`、`docs`。第二批上传时同样点 **Add file → Upload files**，路径会自动合并。
3. 下方 **Commit changes** 输入框写 `init`，点 **Commit changes**

> 上传中如果某个文件夹没进去，回到本地点开确认里面不是空的，再单独拖一次。

### 方式 B：GitHub Desktop（文件多的时候更稳）

1. 下载安装 **https://desktop.github.com/**
2. 登录你的 GitHub 账号
3. 菜单 **File → Add local repository** → 选中本地 `photo-blog` 文件夹
4. 左下角填提交信息 `init` → 点 **Commit to main**
5. 右上角点 **Publish repository** → 取消勾选 "Keep this code private" → **Publish repository**

### 方式 C：命令行（会用的人用）

```bash
cd photo-blog
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/你的用户名/photo-blog.git
git push -u origin main
```

---

## 第 4 步：部署到 Netlify

1. 打开 **https://app.netlify.com/signup**，点 **Sign up with GitHub**（用 GitHub 登录，省一次注册）
2. 授权 Netlify 访问你的 GitHub（可以只授权单个仓库）
3. 进入后台后点 **Add new site → Import an existing project**
4. 选 **Deploy with GitHub** → 如果弹出授权页，点 **Authorize Netlify**
5. 在仓库列表里选 `photo-blog`
6. 构建设置页：
   - **Branch to deploy**：`main`
   - **Build command**：会自动读成 `npm run build`（来自 `netlify.toml`，若为空就手填）
   - **Publish directory**：`dist`
   - **Node 版本**：`netlify.toml` 里已写死 `NODE_VERSION = "22"`，不用管
7. 点 **Deploy photo-blog**
8. 等 2–4 分钟，看到 **Published** 就是成功。页面顶部会给你一个网址，形如
   `https://spontaneous-panda-1a2b3c.netlify.app`

### 改一个短一点、好记的网址（可选，仍免费）

**Site configuration → Site details → Change site name** → 输入 `foggy-harbour` → 网址变成 `https://foggy-harbour.netlify.app`

> 这个名字全世界唯一，被占用了就换一个。

### 别忘了更新这三处网址（不一致会导致分享卡片和搜索出问题）

| 文件 | 改什么 |
| --- | --- |
| `astro.config.mjs` | `SITE_URL = 'https://你的名字.netlify.app'` |
| `src/lib/config.ts` | `url: 'https://你的名字.netlify.app'` |
| `public/admin/config.yml` | `site_url:` 与 `display_url:` 两行 |

改完提交（网页上点开文件 → 铅笔图标编辑 → Commit changes），Netlify 会自动重新部署。

---

## 第 5 步：开启 Identity（让后台能登录）

在 Netlify 站点后台：

1. 左侧 **Site configuration**（旧版叫 Site settings）
2. 左栏找 **Identity** → 点 **Enable Identity**
3. 开启后同一页出现设置项：
   - **Registration**（注册偏好）→ 选 **Invite only**（只有被邀请的人能注册，防止陌生人建号）
   - **Emails** 可以不改
4. 在同一页往下找 **Services → Git Gateway** → 点 **Enable Git Gateway**

> Git Gateway 的作用：让"已登录的后台用户"能代表你往 GitHub 提交文件，而**不用把你的 GitHub 密码给任何人**。
> 如果你看不到 Git Gateway 这一项，先确认 Identity 已经 Enable（第 2 小步），刷新页面再看。

---

## 第 6 步：邀请你自己（唯一的管理员）

1. **Identity** 页面 → 点 **Invite users**
2. 填你的邮箱 → **Send**
3. 去邮箱找主题为 **"You've been invited to join …"** 的邮件（发件人 `identity@netlify.com`）
   - 没收到？看垃圾箱/推广箱；或等 2 分钟再点一次 Send
4. 点邮件里的 **Accept the invite**
5. 设置密码（至少 8 位）→ 提交

---

## 第 7 步：登录后台，发第一篇

1. 浏览器打开 `https://你的名字.netlify.app/admin/`
2. 点 **Login with Netlify Identity** → 用第 6 步的邮箱密码登录
3. 看到左侧三个分类：**摄影作品 / 文章随笔 / 摄影系列**
4. 点 **摄影作品 → New 摄影作品**
5. 填写（带 * 的必填）：
   - **标题（中文）**：如 `雾港`
   - **右上角的 Slug**：点一下改成 `fog-harbour`（英文短名，决定网址 `/works/fog-harbour/`）
   - **发布日期**：选今天
   - **封面图**：点 **Choose an image** → **Upload** → 选图（会自动传到仓库的 `src/assets/uploads/`）
   - **正文（中文）**：直接写，支持加粗/标题/引用
6. 右上角点 **Publish**（草稿状态下是 **Save**，published 后是 **Publish**）
7. 等 1–2 分钟，Netlify 会自动构建，刷新你的网站就能看到

> 首次发布后，可以在 **Deploys** 页面看到每次提交触发的构建记录。构建失败会显示红色 Failed，点进去看日志最后几行（常见原因：漏了封面图、日期格式写错）。

---

## 第 8 步：开通留言（Giscus，可选但推荐）

1. 打开 **https://github.com/apps/giscus** → **Install** → 选择你的 `photo-blog` 仓库
2. 回到仓库页面 → 顶部 **Settings → General → Features** → 勾选 **Discussions**
3. 打开 **https://giscus.app/zh-CN**
4. 依次填：
   - **仓库**：`你的用户名/photo-blog`（必须公开仓库）
   - **Discussion 分类**：选 `Announcements`（若没有，去 Discussions → 分类管理里新建一个，类型选 Announcements）
   - **页面 ↔ Discussion 映射**：选 `pathname`
   - 主题：`preferred_color_scheme`（跟随深浅色）
5. 页面下方会生成一段 `<script>`，里面有两个 ID：`data-repo-id` 和 `data-category-id`
6. 打开 `src/lib/config.ts`，把这两个值填进：
   ```ts
   giscus: {
     repo: '你的用户名/photo-blog',
     repoId: 'R_kgDOxxxxxxx',      // ← 粘贴 data-repo-id
     category: 'Announcements',
     categoryId: 'DIC_kwDOxxxxxxx', // ← 粘贴 data-category-id
     ...
   }
   ```
7. 提交（Commit changes）→ 等部署完成 → 作品详情页底部和 `/guestbook/` 就会出现评论区

> 没配置之前，页面显示"留言功能尚未配置"的虚线框，不会报错。

---

## 备选路线：如果 Netlify Identity 用不了

Netlify 把 Identity 定位为"维护模式"（还能开、还能用，但不再是主推）。万一哪天入口消失或登录异常，用这条：

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL：`https://你的名字.netlify.app`
   - Authorization callback URL：`https://api.netlify.com/auth/done`
   - 记下 **Client ID** 和 **Client Secret**
2. 在另一个免费 Netlify 站点部署开源 OAuth 代理：`https://github.com/vencax/netlify-cms-github-oauth-provider`（用 Netlify 一键 Deploy，环境变量填上面的 Client ID/Secret）
3. 改 `public/admin/config.yml`：
   ```yaml
   backend:
     name: github
     repo: 你的用户名/photo-blog
     branch: main
     base_url: https://你的oauth代理.netlify.app
     auth_endpoint: auth
   ```
4. 部署后重新打开 `/admin/`，会改用 GitHub 账号登录

**第三条兜底**（永远不会失效）：直接在 GitHub 网页打开 `.md` 文件点铅笔图标编辑，或 **Add file → Upload files** 传图，提交后自动发布。没有可视化界面，但内容一样能发。

---

## 常见问题

| 现象 | 原因与解决 |
| --- | --- |
| 打开 `/admin/` 一直转圈 | `decap-cms` CDN 被墙或慢。用手机流量/换网络再试；或把 `index.html` 里的 unpkg 换成 `https://cdn.jsdelivr.net/npm/decap-cms@^3.17.1/dist/decap-cms.js` |
| 点 Login 没反应 | Identity 没 Enable，或 Git Gateway 没开 |
| 登录后显示 "Git Gateway Error" | 确认 Git Gateway 已 Enable；确认你的账号在 Identity 用户列表里 |
| 邀请邮件收不到 | 垃圾箱；或 Identity → Users 里删掉重发 |
| Publish 后网站没变 | 等 1–2 分钟；去 Netlify **Deploys** 看是否构建失败 |
| 图片上传了但显示不出来 | 确认 `config.yml` 里 `media_folder` = `src/assets/uploads`、`public_folder` = `../../assets/uploads` |
| 上传的图太大构建很慢 | 见 `docs/H-图片上传与优化.md`，上传前先压到长边 2000px |
| 构建日志出现 "cover is required" | 那条内容没传封面图。补一张再 Publish |
