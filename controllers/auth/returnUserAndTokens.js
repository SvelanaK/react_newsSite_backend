const jwt = require('jsonwebtoken');

const { Tokens } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async returnUserAndTokens(req, res, { user }) {
    try {
      const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_FOR_ACCESS, { expiresIn: '30m' });
      const refreshToken = jwt.sign({ id: user.id }, process.env.SECRET_FOR_REFRESH, { expiresIn: '31d' });
      await Tokens.create({
        refreshToken,
        userId: user.id,
      });
      return res
        .cookie('cookieRefreshToken', refreshToken, {
          maxAge: 30 * 24 * 60 * 1000,
          httpOnly: true,
        })
        .status(RESPONSE_STATUSES.CREATED)
        .send({
          accessToken: `Bearer ${accessToken}`,
          user: {
            id: user.id,
            login: user.login,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            registrationDate: user.createdAt,
          },
        });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.BAD_REQUEST)
        .send(error.message);
    }
  },
};
