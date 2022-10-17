const { unlink } = require('node:fs/promises');

const { Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');
const { ERROR_MESSAGE } = require('../../errorMessages');

module.exports = {
  async editProfile(req, res) {
    try {
      const {
        user,
        files: {
          picture,
        },
        body: {
          email,
          login,
        },
      } = req;

      const date = Date.now();
      const pictureName = `images/${date}${picture.name}`;

      const payload = {};

      if (login) {
        payload.login = await login.trim();
      }

      if (email) {
        payload.email = await email.trim();
      }

      if (picture) {
        try {
          await unlink(`public/${user.picture}`);
          await picture.mv(`public/${pictureName}`);
          payload.picture = pictureName;
        } catch (error) {
          return res
            .status(RESPONSE_STATUSES.NOT_FOUND)
            .send(ERROR_MESSAGE.NOT_FOUND);
        }
      }

      await Users.update(
        payload,
        { where: { id: user.id } },
      );

      const editedUser = await Users.findOne(
        {
          attributes: ['login', 'id', 'email', 'firstName', 'lastName', 'picture'],
          where: { id: user.id },
        },
      );

      return res
        .status(RESPONSE_STATUSES.OK)
        .send({ user: editedUser });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  },
};
