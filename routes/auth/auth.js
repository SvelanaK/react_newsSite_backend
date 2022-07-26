const express = require('express');
const {
  registrationUser,
  loginUser,
  logoutUser,
  refreshUser,
  whoAmIUser,
} = require('../../controllers/auth/index');

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/registration', registrationUser);
router.post('/refresh', refreshUser);
router.post('/whoAmI', whoAmIUser);

module.exports = router;
