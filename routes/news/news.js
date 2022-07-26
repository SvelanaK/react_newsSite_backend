const express = require('express');
const {
  getNewsSuccess,
} = require('../../controllers/news/getNewsSuccess');

const router = express.Router();

router.get('/', getNewsSuccess);

module.exports = router;
