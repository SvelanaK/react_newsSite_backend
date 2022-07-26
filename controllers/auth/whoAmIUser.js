require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async whoAmIUser(req, res) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res
          .status(RESPONSE_STATUSES.UNAUTHORIZED)
          .send('User unauthorized');
      }

      const userId = jwt.verify(
        refreshToken,
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

      return res
        .status(RESPONSE_STATUSES.OK)
        .send({
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
