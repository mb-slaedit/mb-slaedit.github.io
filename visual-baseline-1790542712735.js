
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const urls = ["home","catalogo"];
const viewports = ["desktop","mobile"];
const BASELINE_DIR = ".visual-baseline";
const VIEWPORTS = {"desktop":{"width":1440,"height":900},"mobile":{"width":390,"height":844},"tablet":{"width":768,"height":1024}};

(async () => {
  const browser = await chromium.launch();
  
  for (const url of urls) {
    for (const vp of viewports) {
      const viewport = VIEWPORTS[vp];
      if (!viewport) continue;
      
      const page = await browser.newPage({ viewport });
      await page.goto("http://localhost:8100" + (url === "home" ? "" : "/" + url), { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);
      
      const filename = url + "-" + vp + ".png";
      const filepath = path.join(".visual-baseline", filename);
      await page.screenshot({ path: filepath, fullPage: true });
      console.log("CAPTURED:" + filename);
    }
  }
  
  await browser.close();
})();
