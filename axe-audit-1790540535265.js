
      const { chromium } = require("playwright");
      const { AxeBuilder } = require("@axe-core/playwright");
      (async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto("http://localhost:8100", { waitUntil: "networkidle" });
        const results = await new AxeBuilder({ page }).analyze();
        console.log("AXE_RESULTS:" + JSON.stringify(results));
        await browser.close();
      })();
    