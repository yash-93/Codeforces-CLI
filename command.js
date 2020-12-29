#!/usr/bin/env node
const program = require("commander");
const { getCredentials, readCredentials } = require("./auth");
const { getTags } = require("./getTags");
const { getProblems } = require("./getProblems");
const { chooseProblem } = require("./enquire");
const { fetchQuestion } = require("./fetchQuestion");

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

program
  .command("gettags")
  .alias("gt")
  .description("Get problem tags")
  .action(async () => {
    let tags = await getTags("https://codeforces.com/problemset");
    let problemsData = await getProblems(tags);
    let problemsTitle = [];
    for (let i = 0; i < problemsData.length; i++)
      problemsTitle.push(i + ". " + problemsData[i].title);

    let chosenProblem = await chooseProblem(problemsTitle);
    let chosenProblemIndex = "";
    if (chosenProblem[1] !== ".")
      chosenProblemIndex = chosenProblem.substring(0, 2);
    else chosenProblemIndex = chosenProblem.substring(0, 1);
    fetchQuestion(problemsData[chosenProblemIndex].url);
  });

program
  .command("getproblem <cid> <pb>")
  .alias("gp")
  .description("Get problem using problem id")
  .action(async (id,pb) => {
    let url = "/problemset/problem/" + id + "/" + pb;
    fetchQuestion(url);
  });

program.parse(process.argv);
