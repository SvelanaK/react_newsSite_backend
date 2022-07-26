const bcrypt = require('bcrypt');

const { generateTokens } = require('./createTokens');

const { Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async loginUser(req, res) {
    try {
      const {
        login,
        password,
      } = await req.body;

      if (!(login && password)) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send('error, please fill in the field');
      }

      const findUser = await Users.findOne(
        { where: { login } },
      );

      if (!findUser) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send(`User with login ${login} not found`);
      }
      const validPassword = bcrypt.compareSync(password, findUser.password);

      if (!validPassword) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send('Incorrect password');
      }

      const { accessToken, refreshToken } = await generateTokens(findUser.id);

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
