const express = require('express');
const passport = require('passport');

const {
  getProfile,
  editProfile,
} = require('../../controllers/user/index');

const router = express.Router();

router.get('/:id', getProfile);
router.patch('/:id', passport.authenticate('jwt', { session: false }), editProfile);

module.exports = router;
