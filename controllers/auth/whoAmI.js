const { returnUserAndTokens } = require('./returnUserAndTokens');

const { Users, Tokens } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async whoAmI(req, res) {
    try {
      const { cookies: { cookieRefreshToken } } = req;

      if (!cookieRefreshToken) {
        return res
          .status(RESPONSE_STATUSES.UNAUTHORIZED)
          .send({ message: 'User unauthorized' });
      }

      const foundUserToken = await Tokens.findOne(
        { where: { refreshToken: cookieRefreshToken } },
      );
      if (!foundUserToken) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ message: 'Token not found' });
      }

      const foundUser = await Users.findOne(
        { where: { id: foundUserToken.userId } },
      );
      if (!foundUser) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ message: 'User not found' });
      }

      return await returnUserAndTokens(req, res, { user: foundUser });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  },
};
