const cheerio = require("cheerio");
const request = require("request");

module.exports = {
  fetchQuestion: async (url) => {
    request(
      {
        method: "GET",
        url: "https://codeforces.com" + url,
      },
      (err, res, body) => {
        if (err) return console.error(err);

        let $ = cheerio.load(body);
        console.log(); // empty line
        let title = $(".header .title").text();
        console.log(title); // print problem title
        let timelimit = $(".time-limit").text();
        console.log(
          timelimit.substring(0, 19) + " : " + timelimit.substring(19)
        ); // print timelimit

        console.log(); // empty line

        let problem = $(".problem-statement");
        let noOfProblemPs = problem.children()[1].children.length; // length of the problem description p tags*/
        for (let i = 0; i < noOfProblemPs; i++) {
          let temp = problem.children()[1].children[i].children[0].data;
          console.log(temp.replace(/\$/g, "")); // printing the problem description
        }

        console.log(); // empty line

        let noOfInputSpecPs = problem.children()[2].children.length; // length of the input specification p tags
        for (let i = 0; i < noOfInputSpecPs; i++) {
          let temp = problem.children()[2].children[i].children[0].data;
          console.log(temp.replace(/\$/g, "")); // printing the input specification
        }

        console.log(); // empty line

        let output = $(".output-specification");
        let outputContent = output.text();
        console.log(outputContent.substring(0, 6));
        console.log(outputContent.substring(6).replace(/\$/g, "")); // printing the ouput specification

        console.log(); // empty line
        console.log("Sample Test");

        let temp = $(".sample-test").children();
        for (let i = 0; i < temp.length; i++) {
          console.log(i % 2 === 0 ? "input" : "output"); // print all sample test cases
          console.log(temp[i].children[1].children[0].data);
        }
      }
    );
  },
};
