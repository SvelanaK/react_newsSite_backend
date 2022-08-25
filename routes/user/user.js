const express = require('express');
const passport = require('passport');
const {
  getUserPage,
  addNews,
} = require('../../controllers/user/index');

const router = express.Router();

router.get('/:id', getUserPage);
router.post('/addNews', passport.authenticate('jwt', { session: false }), addNews);

module.exports = router;
