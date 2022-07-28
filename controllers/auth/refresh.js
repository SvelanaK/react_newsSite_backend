const { returnUserAndTokens } = require('./returnUserAndTokens');
const { Users, Tokens } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async refresh(req, res) {
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

      const foundUser = await Users.findOne(
        { where: { id: foundUserToken.userId } },
      );

      await Tokens.destroy(
        { where: { refreshToken: cookieRefreshToken } },
      );

      res.clearCookie('cookieRefreshToken', { secure: true, httpOnly: true });

      return await returnUserAndTokens(req, res, { user: foundUser });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.BAD_REQUEST)
        .send(error.message);
    }
  },
};
