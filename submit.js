const puppeteer = require("puppeteer");
const chalk = require("chalk");

const loginURL = "https://codeforces.com/enter";
const submitURL = "https://codeforces.com/problemset/submit";

module.exports = {
  submit: async (pid, pathtofile) => {
    try {
      const browser = await puppeteer.launch();
      // const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto(loginURL);

      await page.type("#handleOrEmail", "yashdeepbachhas93@gmail.com");
      await page.type("#password", "password");
      await page.click(".submit");

      await Promise.all([page.waitForNavigation(), page.click(".submit")]);

      await page.goto(submitURL);
      await page.waitFor("input[name=submittedProblemCode]");
      await page.type("input[name=submittedProblemCode]", pid);

      await page.waitForSelector("input[type=file]");
      await page.waitFor(1000);

      const inputUploadHandle = await page.$("input[type=file]");
      inputUploadHandle.uploadFile(pathtofile);
      try {
        await page.click(".submit");
        await Promise.all([page.waitForNavigation(), page.click(".submit")]);
      } catch (error) {
        console.log(
          chalk.red(
            "Same code already submitted, try submitting different code."
          )
        );
      }
      await browser.close();
    } catch (e) {
      throw Error(e);
    }
  },
};
