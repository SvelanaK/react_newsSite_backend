const express = require('express');

const router = express.Router();
const {
  getAllNews,
  addNews,
} = require('../controllers/news/index');

router.get('/', getAllNews);
router.post('/:userId', addNews);

module.exports = router;
