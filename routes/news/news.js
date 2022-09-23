const express = require('express');

const {
  getAllNews,
  addNews,
} = require('../../controllers/news/index');

const router = express.Router();

router.get('/', getAllNews);
router.post('/addNews', addNews);

module.exports = router;
