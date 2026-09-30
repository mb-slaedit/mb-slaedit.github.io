
      const { chromium } = require("playwright");
      (async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto("https://staging.rwapple.com.br", { waitUntil: "networkidle" });
        const schemas = await page.evaluate(() => {
          const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
          return scripts.map(s => {
            try { return JSON.parse(s.textContent); } catch { return null; }
          }).filter(Boolean);
        });
        console.log("SCHEMA_RESULTS:" + JSON.stringify(schemas));
        await browser.close();
      })();
    