const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  // Listen for console logs
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:5173/');
  console.log("Navigated to splash");
  
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'splash-1s.png' });
  console.log("Took screenshot at 1s");
  
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'splash-3s.png' });
  console.log("Took screenshot at 3s");
  
  await browser.close();
})();
