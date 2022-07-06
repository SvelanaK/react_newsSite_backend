const express = require('express');
const router = express.Router();
const {
  getUsersNews,
  addNews,
  changeUserInfo,
  addUser,
} = require('../controllers/usersController');

router.post('/api/user', addUser);
router.get('/api/user', getUsersNews);
router.post('/api/user/:userId', addNews);
router.put('/api/user/:userId', changeUserInfo);

module.exports = router;
