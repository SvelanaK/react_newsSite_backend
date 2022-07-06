const { User } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async updateUserInfo(req, res) {
    const { name, picture } = req.body;
    return User
      .findByPk(req.params.userId)
      .then((response) => {
        if (response) {
          User
            .update(
              { name, picture },
              { where: { useId: req.params.userId } },
            )
            .then(() => res.status(RESPONSE_STATUSES.OK).send());
        } else {
          throw new Error();
        }
      })
      .catch((error) => res.status(RESPONSE_STATUSES.BAD_REQUEST).send(error));
  },
};
