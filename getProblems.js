const cheerio = require("cheerio");
const axios = require("axios").default;

module.exports = {
  getProblems: async (tags) => {
    let url = "https://codeforces.com/problemset?tags=";
    for (let i = 0; i < tags.length; i++) {
      url += tags[i] + ",";
    }
    const { data } = await axios.get(url);
    let $ = cheerio.load(data);
    let problemData = $(".problems tbody tr div:nth-child(1) a");
    let problemList = [];
    for (let i = 0; i < problemData.length; i++) {
      let problem = {};
      problem.url = problemData[i].attribs.href;
      problem.title = problemData[i].children[0].data.trim();
      problemList.push(problem);
    }
    return problemList;
  },
};
