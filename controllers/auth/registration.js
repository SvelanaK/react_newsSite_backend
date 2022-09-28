const { Op } = require('sequelize');

const { returnUserAndTokens } = require('./returnUserAndTokens');
const { Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');
const { ERROR_MESSAGE } = require('../../errorMessages');

module.exports = {
  async registration(req, res) {
    try {
      const {
        body: {
          firstName,
          lastName,
          email,
          login,
          password,
        },
      } = req;

      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        login: login.trim(),
        password,
      };

      const missingData = payload.firstName === ''
      || payload.lastName === ''
      || payload.email === ''
      || payload.login === ''
      || payload.password === '';

      if (missingData) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send(ERROR_MESSAGE.MISSED_DATA);
      }

      const candidate = await Users
        .findOne(
          { where: { [Op.or]: [{ login: payload.login }, { email: payload.email }] } },
        );

      if (candidate) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send(ERROR_MESSAGE.USER_ALREADY_EXISTS);
      }

      const newUser = await Users
        .create(payload);

      return await returnUserAndTokens(req, res, { user: newUser });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  },
};
