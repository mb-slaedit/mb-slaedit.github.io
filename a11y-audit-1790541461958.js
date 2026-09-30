
const { chromium } = require("playwright");
const { AxeBuilder } = require("@axe-core/playwright");

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://staging.rwapple.com.br", { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).analyze();
  console.log("AXE_RESULTS:" + JSON.stringify(results));
  await browser.close();
})();
