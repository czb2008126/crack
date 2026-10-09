# 验证记录

日期：2026-10-09（Asia/Shanghai）。在本机独立无头 Chrome 中验证静态网站；未声称执行过 Codex 云端验证，也未启用 GitHub Pages。

## 通过的检查

- `python3 tests/check_site.py`：中文页面语言、20 个站内锚点、5 个本地资源、6 个历史节点及外链属性检查通过。
- `node --check script.js`：JavaScript 语法检查通过。
- `tests/browser_check.cjs`：在 1440、768、390、320 像素宽度下均通过浏览器测试。
- 页面 HTTP 响应为 200，全部图片加载成功，无资源请求失败、HTTP 错误或 JavaScript 异常。
- 全部足迹显示 6 个节点；德国与美国筛选分别显示对应的 3 个节点；按钮选中状态与 `aria-pressed` 正确。
- 键盘 Enter 可触发筛选，锚点按钮正确跳到历史部分，原生问答能够展开与收起。
- 所有测试宽度下均无横向溢出；桌面与手机完整页面截图已经人工查看。
- 关闭 JavaScript 后仍显示全部历史，原生问答可用，不显示失效的筛选按钮。

## 浏览器检查复现

网站无构建步骤。启动 Python HTTP 服务后，在提供 Playwright 的开发环境运行：

```sh
node tests/browser_check.cjs
```

默认地址为 `http://127.0.0.1:8000`；`SITE_URL` 与 `PLAYWRIGHT_CHROMIUM_EXECUTABLE` 可覆盖地址及浏览器路径。测试使用独立浏览器上下文，不读取个人浏览器配置。

## 范围

历史内容依据 README 与网页列出的 AKC、AMSC 来源简要整理；首页图为 AI 生成主题配图。当前验证覆盖 Chrome，不代表所有浏览器或读屏软件均已实测。代码提交与公开网站部署是两个步骤，本次只提交代码。
