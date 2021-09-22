const scraper = require('./scraper.service');
const parser = require('./parser.service');

const finder = async (url, keyword) => {
  const html = await scraper(url);
  const found = parser(html, keyword);
  return {
    timestamp: Date.now(),
    keyword,
    url,
    found,
  };
};

module.exports = finder;
