const axios = require("axios");

async function getIP() {
  try {
    const { data } = await axios.get("https://api.ipify.org");
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

//getIP();  // called just once

// call getIP every 5 minutes
const CronJob = require("cron").CronJob;
const job = new CronJob("0 */5 * * * *", function() {
    console.log(`IP address at ${new Date().toLocaleString()}`);
    getIP();
  }, null, true, "America/Toronto");
job.start();
