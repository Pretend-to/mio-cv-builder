const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const app = express();

const staticPath = path.join(__dirname, "dist");
app.use(express.static(staticPath));
app.use(express.json({ limit: '1000kb' }));

const logger = {
  info(req, msg) {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    if (ip !== '127.0.0.1' && ip !== '::1') { // 跳过本地 IP 地址
      console.log(`[${new Date().toISOString()}][INFO][${ip}] ${msg}`);
    }
  },
  warn(req, msg) {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    if (ip !== '127.0.0.1' && ip !== '::1') { // 跳过本地 IP 地址
      console.log(`[${new Date().toISOString()}][WARN][${ip}] ${msg}`);
    }
  },
  wrong(req, msg) {
    const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    if (ip !== '127.0.0.1' && ip !== '::1') { // 跳过本地 IP 地址
      console.log(`[${new Date().toISOString()}][ERROR][${ip}] ${msg}`);
    }
  }
};

// 全局错误处理中间件
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.get("/output/*", (req, res, next) => {
  const fullPath = req.originalUrl;
  const parts = fullPath.split("/");
  const id = parts[2];
  const filename = parts[3];
  const filePath = path.join(__dirname, fullPath);

  logger.info(req, '读取了源文件')

  //console.log("\nid:" + id + "\nfilename:" + filename);

  // 检查是否存在 index.html 文件
  const indexPath = path.join(__dirname, "output", id, "index.html");
  fs.access(indexPath, fs.constants.F_OK, (err) => {
    if (!err && !filename) {
      // 存在 index.html 文件，且没有后续的指定文件名称，发送该文件给客户端
      res.sendFile(indexPath);
    } else {
      // 不存在 index.html 文件，或用户指定了文件，继续处理逻辑
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          // 处理错误情况，例如文件不存在
          next(err); // 将错误传递给错误处理中间件
        } else {
          // 发送文件内容给客户端
          res.send(data);
        }
      });
    }
  });
});

app.post("/upload", async (req, res, next) => {
  try {
    const templatePath = path.join(__dirname, "template", "index.html");
    let uuid = uuidv4();
    let screenshotPath;

    if (req.body.uuid !== '' && fs.existsSync(path.join(__dirname, "output", req.body.uuid))) {
      // 如果请求的 JSON 中包含 uuid 键，则使用该 uuid
      uuid = req.body.uuid;
      logger.info(req, "已获取用户信息，对方使用已存在的 uuid :" + uuid)
      const dirPath = path.join(__dirname, "output", uuid);
      const filePath = path.join(dirPath, "info.json");
      screenshotPath = path.join(__dirname, "result", `${uuid}.png`);

      fs.unlinkSync(filePath);        //删除之前的json
      fs.writeFileSync(filePath, JSON.stringify(req.body));    //写入新的json

    } else {
      logger.info(req, "已获取用户信息，对方使用未存在的 uuid :" + uuid)

      const dirPath = path.join(__dirname, "output", uuid);
      const filePath = path.join(dirPath, "info.json");
      screenshotPath = path.join(__dirname, "result", `${uuid}.png`);

      fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(req.body));
      fs.copyFileSync(templatePath, path.join(dirPath, "index.html"));
    }

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1050, height: 1485 });
    await page.goto(`http://localhost:5400/output/${uuid}`, {
      waitUntil: "networkidle0",
    });
    await page.screenshot({ path: screenshotPath });
    await browser.close();

    res.send(uuid);
  } catch (err) {
    next(err); // 将错误传递给错误处理中间件
  }
});

app.get("/result/:uuid", async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const filePath = path.join(__dirname, "result", `${uuid}.png`);

    const exists = await fs.promises
      .access(filePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      console.log("File not found");
      return res.status(404).send("Not found");
    }
    logger.info(req, "尝试获取图像预览，已返回" + uuid + ".png")

    res.sendFile(filePath);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/resultpdf/:uuid", async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const dirPath = path.join(__dirname, "output", uuid);
    const pdfPath = path.join(__dirname, "result", `${uuid}.pdf`);
    const filename = req.query.n;

    fs.access(dirPath, fs.constants.F_OK, async (err) => {
      if (err) {
        res.status(404).send("Not found");
      } else {
        let final
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.evaluate(() => {
          return {
            width: 1050,
            height: 1485,
            scale: 0.75,
            deviceScaleFactor: window.devicePixelRatio
          };
        });
        await page.goto(`http://localhost:5400/output/${uuid}`, {
          waitUntil: "networkidle0",
        });
        await page.pdf({
          path: pdfPath,
          fullPage: true,
          format: "A4",
          printBackground: true,
          width: 1050,
          height: 1485,
          scale: 0.75,
          '-webkit-print-color-adjust': 'exact',
        });

        await browser.close();

        if (filename) {
          // 如果 filename 参数存在，则重命名文件并发送重命名后的文件
          const renamedFilePath = path.join(
            __dirname,
            "result",
            `${filename}.pdf`
          );
          fs.rename(pdfPath, renamedFilePath, (err) => {
            if (err) {
              // 处理重命名文件时的错误
              console.error("Failed to rename file:", err);
              res.status(500).send("Internal Server Error");
            } else {
              final = filename + '.pdf'
              logger.info(req, "发生下载请求：文件名：" + final)
              res.download(renamedFilePath, final, function(err) {
                if (err) {
                  // 发生错误时的处理逻辑
                  console.error('下载文件时出错:', err);
                  res.status(500).send('下载文件时出错');
                }
              });
            }
          });
        } else {
          final = uuid + ".pdf"
          res.download(pdfPath, final, function(err) {
            if (err) {
              // 发生错误时的处理逻辑
              console.error('下载文件时出错:', err);
              res.status(500).send('下载文件时出错');
            }
          });
          logger.info(req, "发生下载请求：文件名：" + final)
        }
      }
    });
  } catch (err) {
    next(err); // 将错误传递给错误处理中间件
  }
});

app.use((req, res) => {
  logger.warn(req, '请求发生错误！请求路径:' + req.originalUrl)
  res.status(404).send("Not found");
});

app.listen(5400, () => {
  console.log("Server running on port 5400");
});
