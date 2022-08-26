const { returnUserAndTokens } = require('./returnUserAndTokens');
const { Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');
const { ERROR_MESSAGE } = require('../../errorMessages');

module.exports = {
  async login(req, res) {
    try {
      const {
        body: {
          login,
          password,
        },
      } = req;

      if (login.trim() === '' || password === '') {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send(ERROR_MESSAGE.MISSED_DATA);
      }

      const foundUser = await Users.findOne(
        { where: { login: login.trim() } },
      );

      if (!foundUser) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send(ERROR_MESSAGE.USER_NOT_FOUND);
      }
      const validPassword = await foundUser.comparePassword(password);
      if (!validPassword) {
        return res
          .status(RESPONSE_STATUSES.CONFLICT)
          .send(ERROR_MESSAGE.INVALID_NOT_FOUND);
      }

      return await returnUserAndTokens(req, res, { user: foundUser });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  },
};
