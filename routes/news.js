const express = require('express');
const router = express.Router();
const {
  getAllNews,
} = require('../controllers/newsController');

router.get('/api/news', getAllNews);


module.exports = router;