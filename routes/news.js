const express = require('express');
const {
  getAllNews,
} = require('../controllers/getAllNews');

const router = express.Router();

router.get('/', getAllNews);

module.exports = router;
