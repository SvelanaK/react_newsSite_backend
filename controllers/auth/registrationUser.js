const bcrypt = require('bcrypt');

const { generateTokens } = require('./createTokens');

const { Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async registrationUser(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        login,
        password,
      } = await req.body;

      if (!(login && password)) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send('error, please fill in the field');
      }

      const candidate = await Users
        .findOne(
          { where: { login } },
        );

      if (candidate) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send('error, such user already exists');
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const newUser = await Users
        .create({
          firstName,
          lastName,
          email,
          login,
          password: hashPassword,
        });

      const { accessToken, refreshToken } = await generateTokens(newUser.id);

      return res
        .cookie('refreshToken', refreshToken, {
          maxAge: 30 * 24 * 60 * 1000,
          httpOnly: true,
        })
        .status(RESPONSE_STATUSES.CREATED)
        .send({
          accessToken,
          user: {
            id: newUser.id,
            login: newUser.login,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            registrationDate: newUser.createdAt,
          },
        });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.BAD_REQUEST)
        .send(error);
    }
  },
};
