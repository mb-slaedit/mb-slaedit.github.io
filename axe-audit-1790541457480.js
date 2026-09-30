
      const { chromium } = require("playwright");
      const { AxeBuilder } = require("@axe-core/playwright");
      (async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://staging.rwapple.com.br", { waitUntil: "networkidle" });
        const results = await new AxeBuilder({ page }).analyze();
        console.log("AXE_RESULTS:" + JSON.stringify(results));
        await browser.close();
      })();
    