const inquirer = require("inquirer");

module.exports = {
  askCfCredentials: () => {
    const questions = [
      {
        name: "username",
        type: "input",
        message: "Enter your Codeforces e-mail address:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your username or e-mail address.";
          }
        },
      },
      {
        name: "password",
        type: "password",
        message: "Enter your password:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your password.";
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
  chooseTags: async (tags) => {
    const questions = [
      {
        type: "checkbox",
        name: "tags",
        message: "Select Tags",
        choices: tags,
      },
    ];
    let res = [];
    await inquirer.prompt(questions).then((answers) => {
      res = answers.tags;
    });
    return res;
  },
  chooseProblem: async (problems) => {
    const questions = [
      {
        type: "list",
        name: "problems",
        message: "Choose a problem to view",
        choices: problems,
      },
    ];
    let chosenProblem = "";
    await inquirer.prompt(questions).then((answers) => {
      chosenProblem = answers.problems;
    });
    return chosenProblem;
  },
};
