const { Tokens } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async logout(req, res) {
    try {
      const { cookies: { cookieRefreshToken } } = req;

      if (!cookieRefreshToken) {
        return res
          .status(RESPONSE_STATUSES.UNAUTHORIZED)
          .send({ message: 'User unauthorized' });
      }

      await Tokens.destroy(
        { where: { refreshToken: cookieRefreshToken } },
      );
      return res
        .clearCookie('cookieRefreshToken', { secure: true, httpOnly: true })
        .status(RESPONSE_STATUSES.OK)
        .send();
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  },
};
