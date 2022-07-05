const express = require('express');
const router = express.Router();
const {
  getUsersNews,
  addNews,
  changeUserInfo,
} = require('../controllers/usersController');

router.get('/user', getUsersNews);
router.post('/user/:userId', addNews);
router.put('/user/:userId', changeUserInfo);

module.exports = router;
