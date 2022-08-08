const { returnUserAndTokens } = require('./returnUserAndTokens');
const { Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

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
          .send({ message: 'Missed data' });
      }

      const foundUser = await Users.findOne(
        { where: { login: login.trim() } },
      );

      if (!foundUser) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ message: 'User not found' });
      }
      const validPassword = await foundUser.comparePassword(password);
      if (!validPassword) {
        return res
          .status(RESPONSE_STATUSES.CONFLICT)
          .send({ message: 'Invalid password' });
      }

      return await returnUserAndTokens(req, res, { user: foundUser });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.BAD_REQUEST)
        .send(error.message);
    }
  },
};
