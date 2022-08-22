const express = require('express');
// const passport = require('passport');
const {
  getUserPage,
} = require('../../controllers/user/index');

const router = express.Router();

router.get('/:id', getUserPage);

module.exports = router;
