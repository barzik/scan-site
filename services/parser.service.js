const cheerio = require("cheerio");

const parser = (input, word) => {
  const $ = cheerio.load(input);
  const result = $(`*:contains("${word}")`);
  if (result.text()) {
    return '1';
  } else {
    return '0';
  }
};

module.exports = parser;
