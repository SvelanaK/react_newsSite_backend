const express = require('express');

const router = express.Router();
const {
  getUsersNews,
  updateUserInfo,
} = require('../controllers/users/index');

router.get('/', getUsersNews);
router.put('/:userId', updateUserInfo);

module.exports = router;
