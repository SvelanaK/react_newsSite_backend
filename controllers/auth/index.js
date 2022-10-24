const { registration } = require('./registration');
const { login } = require('./login');
const { logout } = require('./logout');
const { refresh } = require('./refresh');
const { whoAmI } = require('./whoAmI');
const { googleAuth } = require('./googleAuth');

module.exports = {
  registration,
  login,
  logout,
  refresh,
  whoAmI,
  googleAuth,
};
