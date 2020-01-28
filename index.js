const puppeteer = require('puppeteer');

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://ca.finance.yahoo.com/quote/MG.TO/');
 
  const [priceEl] =  await page.$x('//*[@id="quote-header-info"]/div[3]/div/div/span[1]');
  const price = await priceEl.getProperty('textContent');
  const priceTxt = await price.jsonValue();

  await browser.close();
  
  console.log(priceTxt);
}

//main();  // call main once

// call main every 5 minutes
const CronJob = require('cron').CronJob;
const job = new CronJob('0 */5 * * * *', function() {
    console.log(`Stock Price MG.TO at ${new Date().toLocaleString()}`);
    main();  
}, null, true, 'America/Toronto');
job.start();