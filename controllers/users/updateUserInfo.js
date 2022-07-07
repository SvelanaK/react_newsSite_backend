const { User } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async updateUserInfo(req, res) {
    try {
      const { name, picture } = req.body;
      const findUser = await User.findByPk(req.params.userId);
      if (!findUser) {
        return res
          .status(RESPONSE_STATUSES.NOT_FOUND).send('User not found');
      }
      const updateUserInfo = User
        .update(
          { name, picture },
          { where: { useId: req.params.userId } },
        );
      return res
        .status(RESPONSE_STATUSES.OK).send(updateUserInfo);
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.BAD_REQUEST).send(error);
    }
  },
};
