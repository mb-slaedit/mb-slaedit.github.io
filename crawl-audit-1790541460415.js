
      const { chromium } = require("playwright");
      (async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        const checks = {};
        page.on("response", r => {
          if (r.url().includes("staging.rwapple.com.br") && r.request().resourceType() === "document") {
            checks.status = r.status();
            checks.canonical = r.headers()["link"]?.includes('rel="canonical"') || false;
            checks.contentType = r.headers()["content-type"];
            checks.robots = r.headers()["x-robots-tag"] || "none";
          }
        });
        await page.goto("https://staging.rwapple.com.br", { waitUntil: "networkidle" });
        const meta = await page.evaluate(() => {
          const robots = document.querySelector('meta[name="robots"]');
          const canonical = document.querySelector('link[rel="canonical"]');
          const hreflangs = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map(l => ({ hreflang: l.getAttribute("hreflang"), href: l.getAttribute("href") }));
          return { robots: robots?.content || "none", canonical: canonical?.href || null, hreflangs };
        });
        checks.meta = meta;
        console.log("CRAWL_RESULTS:" + JSON.stringify(checks));
        await browser.close();
      })();
    