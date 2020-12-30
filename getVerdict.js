const axios = require("axios").default;
const chalk = require("chalk");
const { getCredentials, readCredentials } = require("./auth");

module.exports = {
  showVerdict: async () => {
    let email = "";
    let username = "";
    let cred = await getCredentials();
    if (cred !== undefined) {
      email = cred.user;
      username = email.match(/^([^@]*)@/)[1];
    } else {
      cred = await readCredentials();
      username = cred.username.match(/^([^@]*)@/)[1];
    }
    let submissionURL = `https://codeforces.com/api/user.status?handle=${username}&from=1&count=1`;

    axios
      .get(submissionURL)
      .then((response) => {
        console.log(chalk.green("Verdict: " + response.data.result[0].verdict));
        console.log(
          chalk.green(
            "Time: " + response.data.result[0].timeConsumedMillis + "ms"
          )
        );
        console.log(
          chalk.green(
            "Passed Test Cases: " + response.data.result[0].passedTestCount
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
