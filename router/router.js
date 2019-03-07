const Scrappercontroller = require('../controller/controller');
const express = require('express');
const router = express.Router();

router.get('/question', Scrappercontroller.Scrap);

module.exports = router;
