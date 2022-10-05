const fs = require('fs');
const { Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

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

      fs.unlink(`public/images/${user.picture}`, (err) => {
        if (err) throw err;
      });
      await picture.mv(`public/images/${picture.name}`);

      let payload = {
        email: email.trim(),
        login: login.trim(),
        picture: picture.name,
      };

      const hasMissData = payload.email === '' || payload.login === '';

      if (hasMissData) {
        payload = {
          email: user.email,
          login: user.login,
        };
      }

      await Users.update(
        {
          login: payload.login,
          email: payload.email,
          picture: payload.picture,
        },
        { where: { id: user.id } },
      );

      const editUser = await Users.findOne({ where: { id: user.id } });

      return res
        .status(RESPONSE_STATUSES.OK)
        .send({
          user: {
            id: editUser.id,
            login: editUser.login,
            email: editUser.email,
            firstName: editUser.firstName,
            lastName: editUser.lastName,
            picture: editUser.picture,
            registrationDate: editUser.createdAt,
          },
        });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  },
};
