# 创意无限 - 广告创意公司展示网站

一个精美的纯前端广告创意公司展示网站，支持部署到 GitHub Pages。

![Preview](https://picsum.photos/seed/preview/1200/600)

## ✨ 功能特性

- 🎨 现代化深色主题设计，渐变色彩搭配
- 📱 完全响应式布局，适配手机、平板、桌面
- 🖼️ 作品分类展示（海报、电商、Logo、视频）
- 🔍 点击作品放大预览，支持图片和视频
- ⚡ 平滑滚动动画和 hover 交互效果
- 📊 数据统计动画展示
- 🔧 作品配置文件化，易于维护更新

## 📁 项目结构

```
online_website/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # 交互逻辑
├── static/
│   ├── works.json      # 作品配置文件
│   └── images/         # 图片目录（可选）
│       ├── posters/    # 海报图片
│       ├── ecommerce/  # 电商图片
│       ├── logos/      # Logo图片
│       └── videos/     # 视频封面
└── README.md           # 说明文档
```

## 🚀 本地预览

### 方法一：直接打开

双击 `index.html` 文件在浏览器中打开。

> ⚠️ 注意：由于浏览器安全策略，直接打开文件可能无法加载 `works.json`，建议使用本地服务器。

### 方法二：使用本地服务器（推荐）

**使用 Python：**

```bash
# Python 3
cd online_website
python -m http.server 8080

# 然后访问 http://localhost:8080
```

**使用 Node.js：**

```bash
# 安装 http-server
npm install -g http-server

# 启动服务
cd online_website
http-server -p 8080

# 然后访问 http://localhost:8080
```

**使用 VS Code Live Server：**

1. 安装 VS Code 扩展 "Live Server"
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## 📝 修改作品配置

作品数据存储在 `static/works.json` 文件中，您可以轻松添加、修改或删除作品。

### 配置文件结构

```json
{
    "posters": [
        {
            "title": "作品标题",
            "image": "图片URL或本地路径"
        }
    ],
    "ecommerce": [...],
    "logos": [...],
    "videos": [
        {
            "title": "视频标题",
            "cover": "封面图URL",
            "url": "视频URL"
        }
    ]
}
```

### 添加新作品

1. 打开 `static/works.json`
2. 在对应分类数组中添加新对象
3. 保存文件，刷新页面即可看到更新

### 使用本地图片

1. 将图片放入 `static/images/` 对应子目录
2. 在配置文件中使用相对路径，例如：

```json
{
    "title": "我的海报",
    "image": "static/images/posters/my-poster.jpg"
}
```

### 使用在线图片

直接使用图片的完整 URL：

```json
{
    "title": "我的海报",
    "image": "https://example.com/images/poster.jpg"
}
```

## 🌐 部署到 GitHub Pages

### 步骤一：创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角 "+" → "New repository"
3. 输入仓库名称（如 `creative-website`）
4. 选择 "Public"
5. 点击 "Create repository"

### 步骤二：上传代码

**方法 A：使用 Git 命令行**

```bash
# 初始化 Git 仓库
cd online_website
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 关联远程仓库（替换为你的用户名和仓库名）
git remote add origin https://github.com/YOUR_USERNAME/creative-website.git

# 推送代码
git branch -M main
git push -u origin main
```

**方法 B：直接上传**

1. 在 GitHub 仓库页面点击 "uploading an existing file"
2. 拖拽 `online_website` 目录下的所有文件
3. 点击 "Commit changes"

### 步骤三：启用 GitHub Pages

1. 进入仓库的 "Settings" 页面
2. 左侧菜单找到 "Pages"
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main"，目录选择 "/ (root)"
5. 点击 "Save"

### 步骤四：访问网站

等待 1-2 分钟后，访问：

```
https://YOUR_USERNAME.github.io/creative-website/
```

## 🎨 自定义修改

### 修改公司信息

编辑 `index.html` 中的以下部分：

- Logo 和公司名称：搜索 `创意无限`
- Hero 区域文案：搜索 `hero-content`
- 联系方式：搜索 `contact-info`
- 页脚信息：搜索 `footer`

### 修改配色方案

编辑 `css/style.css` 文件开头的 CSS 变量：

```css
:root {
    --primary: #6366f1;        /* 主色调 */
    --primary-dark: #4f46e5;   /* 主色调深色 */
    --secondary: #ec4899;      /* 次要色调 */
    --accent: #06b6d4;         /* 强调色 */
    --dark: #0f172a;           /* 背景深色 */
    /* ... */
}
```

### 修改字体

在 `index.html` 的 `<head>` 中修改 Google Fonts 链接：

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

然后在 CSS 中更新 `font-family`。

## 📱 浏览器兼容性

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ 移动端浏览器

## 📄 License

MIT License - 可自由使用和修改

---

如有问题或建议，欢迎提交 Issue 或 Pull Request！