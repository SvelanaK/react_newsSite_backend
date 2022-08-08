const { registration } = require('./registration');
const { login } = require('./login');
const { logout } = require('./logout');
const { refresh } = require('./refresh');
const { whoAmI } = require('./whoAmI');

module.exports = {
  registration,
  login,
  logout,
  refresh,
  whoAmI,
};
