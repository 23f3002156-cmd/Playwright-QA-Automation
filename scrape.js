const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseUrl = "https://sanand0.github.io/tdsdata/js_table/?seed=";
  let grandTotal = 0;

  for (let seed = 24; seed <= 33; seed++) {
    const url = `${baseUrl}${seed}`;
    console.log(`Visiting ${url}`);
    await page.goto(url);

    const numbers = await page.$$eval("table tr td", tds =>
      tds.map(td => parseFloat(td.innerText.trim() || 0))
         .filter(n => !isNaN(n))
    );

    const seedTotal = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} Total: ${seedTotal}`);
    grandTotal += seedTotal;
  }

  console.log("===================================");
  console.log(`FINAL GRAND TOTAL: ${grandTotal}`);
  console.log("===================================");

  await browser.close();
})();
