// _FilterByTagsFrame_addTagLabel
const cheerio = require("cheerio");
const enquire = require("./enquire");
const axios = require("axios").default;

module.exports = {
  getTags: async (url) => {
    const { data } = await axios.get(url);
    let $ = cheerio.load(data);
    let taglist = [];
    let tags = $("._FilterByTagsFrame_addTagLabel select");
    for (let i = 5; i <= 75; i += 2) {
      taglist.push(tags[0].children[i].attribs.value);
    }
    const res = await enquire.chooseTags(taglist);
    return res;
  },
};
