const program = require("commander");
const CLI = require("clui");
const Configstore = require("configstore");
const Spinner = CLI.Spinner;

const pkg = require("./package.json");
const inquirer = require("./enquire");

const conf = new Configstore(pkg.name);

const run = async () => {
  const credentials = await inquirer.askCfCredentials();
  return credentials;
};

module.exports = {
  getCredentials: async () => {
    let cfUser = {};
    let user = conf.get("cf.user");
    if (user !== undefined) {
      cfUser.user = user;
      cfUser.pass = conf.get("cf.pass");
      return cfUser;
    }
    return undefined;
  },

  readCredentials: async () => {
    let credentials = await run();
    conf.set("cf.user", credentials.username);
    conf.set("cf.pass", credentials.password);
    return credentials;
  },
};
