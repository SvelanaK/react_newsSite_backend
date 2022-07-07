const express = require('express');

const router = express.Router();
const {
  getAllNews,
} = require('../controllers/getAllNews');

router.get('/', getAllNews);

module.exports = router;
