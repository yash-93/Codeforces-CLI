#!/usr/bin/env node
const program = require("commander");
const { getCredentials, readCredentials } = require("./auth");

program.version("1.0.0").description("CF CLI");

program
  .command("login")
  .alias("l")
  .description("Login a user")
  .action(async () => {
    let cred;
    cred = await getCredentials();
    if (cred === undefined) {
      cred = await readCredentials();
    }
    console.log(cred);
  });

program.parse(process.argv);
