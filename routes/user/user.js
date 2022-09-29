const express = require('express');

const {
  getUserPage,
} = require('../../controllers/user/getUserPage');

const router = express.Router();

router.get('/:id', getUserPage);

module.exports = router;
