const { registrationUser } = require('./registrationUser');
const { loginUser } = require('./loginUser');
const { logoutUser } = require('./logoutUser');
const { refreshUser } = require('./refreshUser');
const { whoAmIUser } = require('./whoAmIUser');

module.exports = {
  registrationUser,
  loginUser,
  logoutUser,
  refreshUser,
  whoAmIUser,
};
