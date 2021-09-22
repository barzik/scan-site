const express = require('express');

const router = express.Router();
const dbConnection = require('../services/db.service');
const finder = require('../services/finder.service');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Welcome to the scan site' });
});

/* POST home page. */
router.post('/', async (req, res, next) => {
  const { scantext } = req.body;
  const sites = ['https://example.com', 'https://internet-israel.com'];
  const scansPromises = sites.map((site) => finder(site, scantext));
  const scans = await Promise.all(scansPromises);
  const dbConnectionPromises = scans.map((scan) => dbConnection.writeScans(scan));
  await Promise.all(dbConnectionPromises);
  const scanresults = await dbConnection.readScans(scantext);
  res.render('index', {
    scanresults,
    title: `Search result for: ${scantext}`,
  });
});

module.exports = router;
