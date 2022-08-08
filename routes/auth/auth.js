const express = require('express');
const {
  registration,
  login,
  logout,
  refresh,
  whoAmI,
} = require('../../controllers/auth/index');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/registration', registration);
router.post('/refresh', refresh);
router.post('/whoAmI', whoAmI);

module.exports = router;
