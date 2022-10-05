const express = require('express');
const passport = require('passport');

const {
  getUserPage,
  editProfile,
} = require('../../controllers/user/index');

const router = express.Router();

router.get('/:id', getUserPage);
router.patch('/editProfile', passport.authenticate('jwt', { session: false }), editProfile);

module.exports = router;
