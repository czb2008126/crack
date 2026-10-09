# 小胡子档案

中文迷你雪纳瑞历史个人网站。采用奶油色与橄榄绿的阅读手册设计，包含历史时间线、地区筛选、品种介绍、原生折叠问答和可追溯的资料来源，适配手机与桌面。

## 运行

纯 HTML、CSS 和 JavaScript，无依赖、无构建步骤。直接打开 `index.html` 即可阅读；使用本地 HTTP 服务更方便预览：

```sh
cd crack
python3 -m http.server 8000 --bind 127.0.0.1
```

访问 `http://127.0.0.1:8000`。在 Codex 云端仓库目录 `/workspace/crack` 中，可按环境的预览要求将绑定地址调整为 `0.0.0.0`；具体预览入口以云端界面提供的地址为准。

## 验证

```sh
python3 tests/check_site.py
node --check script.js
```

结构检查覆盖本地资源、锚点、中文页面语言、全部六个历史节点及外链基本安全属性。筛选、原生问答、无脚本阅读与桌面/手机布局另经真实 Chromium 浏览器验证；详细记录见 `VALIDATION.md`。

可选浏览器回归检查：在已安装 Playwright 的开发环境中，保持上述 HTTP 服务运行，然后执行 `node tests/browser_check.cjs`。可通过 `SITE_URL` 指定预览地址，通过 `PLAYWRIGHT_CHROMIUM_EXECUTABLE` 指定现有 Chrome 可执行文件。Playwright 仅用于测试，不是网站运行依赖；测试截图输出到被 Git 忽略的 `artifacts/`。

## 文件

- `index.html`：中文内容、语义结构和来源链接。
- `styles.css`：响应式设计、键盘焦点和减少动效支持。
- `script.js`：时间线的地区筛选。
- `assets/`：本地主题图与原创 SVG 图标。页面不依赖外部字体、图片或脚本。
- `tests/check_site.py`：仅使用 Python 标准库的结构检查。

## 内容与配图

本站是个人兴趣网站，与 AKC、AMSC 无隶属关系，不是它们的官方中文版本。中文内容为简要整理，不应把雪纳瑞家族的古老历史等同于迷你犬种的正式形成时间。

资料核对于 2026-10-09：

1. [AKC · 迷你雪纳瑞历史](https://www.akc.org/expert-advice/dog-breeds/miniature-schnauzer-history/)
2. [AMSC · 迷你雪纳瑞历史](https://amsc.us/all-about-miniature-schnauzers/history-of-the-miniature-schnauzer/)
3. [AKC · 迷你雪纳瑞犬种介绍](https://www.akc.org/dog-breeds/miniature-schnauzer/)
4. [AKC · 标准雪纳瑞犬种介绍](https://www.akc.org/dog-breeds/standard-schnauzer/)

`assets/schnauzer.jpg` 使用内置 ImageGen 生成现代主题配图，不是档案照片，不作为历史或品种标准证据。生成提示词：一只自然垂耳的椒盐色迷你雪纳瑞坐在欧洲乡间花园石台上，银色眉毛与胡须，橄榄绿植物、奶油色石墙、柔和晨光，真实毛发与杂志摄影质感，横向构图，无文字或水印。原始生成图经 JPEG 格式转换和体积优化用于网页。

## 发布网站

提交到 GitHub 保存的是代码，不会自动启用公开网站。若需要公开访问，可在仓库的 **Settings → Pages** 中选择 **Deploy from a branch**，选择 `main` 与根目录 `/ (root)`，保存。启用成功后，通常可在 `https://czb2008126.github.io/crack/` 访问；请以 GitHub Pages 实际显示的地址和部署结果为准。操作依据：[GitHub Pages 官方发布源说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。
