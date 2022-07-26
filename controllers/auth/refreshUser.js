require('dotenv').config();
const jwt = require('jsonwebtoken');

const { generateTokens } = require('./createTokens');

const { Users, Tokens } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async refreshUser(req, res) {
    try {
      const cookieToken = req.cookies.refreshToken;

      if (!cookieToken) {
        return res
          .status(RESPONSE_STATUSES.UNAUTHORIZED)
          .send('User unauthorized');
      }

      const userId = jwt.verify(
        cookieToken,
        process.env.SECRET_FOR_REFRESH,
        (err, payload) => {
          if (err) {
            return res
              .status(RESPONSE_STATUSES.BAD_REQUEST)
              .send(err.message);
          } return payload.id;
        },
      );
      const findUser = await Users.findOne(
        { where: { id: userId } },
      );
      await Tokens.destroy(
        { where: { refreshToken: cookieToken } },
      );
      res.clearCookie('refreshToken', { secure: true, httpOnly: true });

      const { accessToken, refreshToken } = await generateTokens(userId);

      return res
        .cookie('refreshToken', refreshToken, {
          maxAge: 30 * 24 * 60 * 1000,
          httpOnly: true,
        })
        .status(RESPONSE_STATUSES.OK)
        .send({
          accessToken,
          user: {
            id: findUser.id,
            login: findUser.login,
            email: findUser.email,
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            registrationDate: findUser.createdAt,
          },
        });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.BAD_REQUEST)
        .send(error);
    }
  },
};
