# Mio-Cv-Builder

[EN](README-en-us.md) | [中文](README.md)

Mio-Cv-Builder是一个简历构建应用程序，允许用户创建和定制他们的简历。它利用Vue 3作为前端和Node.js作为后端服务器。通过HTTP实现实时通信，后端利用Puppeteer生成可以导出为图像或PDF文件的简历。

## 演示

您可以在[这里](https://cv.krumio.com)查看应用程序的演示。

## 特点

- 创建和定制简历
- 前端和后端之间的实时通信
- 将简历导出为图像或PDF文件

## 待办事项

- 添加更多模板
- 添加更多定制选项

## 使用的技术

- Vue 3
- Node.js
- HTTP通信
- Puppeteer

## 安装

1. 克隆存储库：

```bash
git clone https://github.com/Pretend-to/mio-cv-builder
```

2. 进入项目目录：

```bash
cd mio-cv-builder
```

3. 如果需要，更改前端：

```bash
cd frontend
pnpm install
npm run dev
...
npm run build
```

4. 为后端安装依赖项：

```bash
cd backend
npm install
```

## 使用

要使用该应用程序，您只需启动后端服务器并在浏览器中访问应用程序。（建议使用Nginx作为反向代理）

1. 在默认端口5400上启动后端服务器：

```bash
cd backend
node server.js
```

2. 在浏览器中访问应用程序：

```
http://localhost:5400
```

## 贡献

欢迎贡献！如果您发现任何错误或有改进建议，请提出问题或提交拉取请求。

## 许可证

该项目根据[MIT许可证](LICENSE)许可。