const express = require('express');
const {
  getAllNews,
} = require('../../controllers/news/getAllNews');

const router = express.Router();

router.get('/', getAllNews);

module.exports = router;
