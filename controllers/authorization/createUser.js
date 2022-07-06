const { News } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async createUser(req, res) {
    return News
      .create({
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        picture: req.body.picture,
      })
      .then((addUser) => res.status(RESPONSE_STATUSES.CREATED).send(addUser))
      .catch((error) => res.status(RESPONSE_STATUSES.BAD_REQUEST).send(error));
  },
};
