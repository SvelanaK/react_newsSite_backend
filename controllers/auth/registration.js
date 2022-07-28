const { Op } = require('sequelize');

const { returnUserAndTokens } = require('./returnUserAndTokens');

const { Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

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

      if (
        (firstName.trim() === '')
      || (lastName.trim() === '')
      || (email.trim() === '')
      || (login.trim() === '')
      || (password.trim() === '')) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ message: 'Missed data' });
      }

      const candidate = await Users
        .findOne(
          { where: { [Op.or]: [{ login }, { email }] } },
        );

      if (candidate) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ message: 'User already exists' });
      }

      const newUser = await Users
        .create({
          firstName,
          lastName,
          email,
          login,
          password,
        });

      return await returnUserAndTokens(req, res, { user: newUser });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.BAD_REQUEST)
        .send(error.message);
    }
  },
};
