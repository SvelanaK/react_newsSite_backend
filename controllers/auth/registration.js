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
        firstName.trim() === ''
      || lastName.trim() === ''
      || email.trim() === ''
      || login.trim() === ''
      || password === '') {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ message: 'Missed data' });
      }

      const candidate = await Users
        .findOne(
          { where: { [Op.or]: [{ login: login.trim() }, { email: email.trim() }] } },
        );

      if (candidate) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ message: 'User already exists' });
      }

      const newUser = await Users
        .create({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          login: login.trim(),
          password: password.trim(),
        });

      return await returnUserAndTokens(req, res, { user: newUser });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.BAD_REQUEST)
        .send(error.message);
    }
  },
};
