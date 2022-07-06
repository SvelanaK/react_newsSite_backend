const { createUser } = require('../authorization/createUser');
const { getUsersNews } = require('./getUsersNews');
const { updateUserInfo } = require('./updateUserInfo');

module.exports = {
  createUser,
  getUsersNews,
  updateUserInfo,
};
