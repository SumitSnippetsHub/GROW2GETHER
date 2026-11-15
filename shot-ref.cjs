const puppeteer = require("puppeteer-core");
const path = require("path");
const os = require("os");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: "new",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto("https://amphora-it.com/en/termin?direct=1", { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 4000));
  for (const label of ["Accept", "Akzeptieren", "Accept all", "Alle akzeptieren"]) {
    const [b] = await page.$$(`xpath/.//button[contains(., '${label}')]`);
    if (b) { await b.click().catch(() => {}); break; }
  }
  await new Promise((r) => setTimeout(r, 1500));
  const out = os.tmpdir();
  await page.screenshot({ path: path.join(out, "ref-1.png"), fullPage: true });
  const text = await page.evaluate(() => document.body.innerText);
  console.log(text.slice(0, 3000));
  const frames = page.frames().map((f) => f.url());
  console.log("FRAMES", JSON.stringify(frames));
  await browser.close();
})();
