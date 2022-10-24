const fs = require('fs');
const client = require('https');

const { returnUserAndTokens } = require('./returnUserAndTokens');
const { Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');
const { ERROR_MESSAGE } = require('../../errorMessages');

module.exports = {
  async googleAuth(req, res) {
    try {
      const {
        body: {
          firstName,
          lastName,
          email,
          login,
          password,
          picture,
        },
      } = req;
      const date = Date.now();
      const pictureName = `images/${date}.jpg`;

      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        login: login.trim(),
        password,
        picture: pictureName,
      };

      const hasMissData = payload.firstName === ''
      || payload.lastName === ''
      || payload.email === ''
      || payload.login === ''
      || payload.password === '';

      if (hasMissData) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send(ERROR_MESSAGE.MISSED_DATA);
      }

      const foundUser = await Users.findOne(
        { where: { login: payload.login } },
      );

      if (foundUser) {
        return await returnUserAndTokens(req, res, { user: foundUser });
      }
      if (picture) {
        client.get(picture, (response) => {
          response.pipe(fs.createWriteStream(`public/${pictureName}`));
        });
      }
      const newUser = await Users
        .create(payload);
      return await returnUserAndTokens(req, res, { user: newUser });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  },
};
