const { News, Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async getUserPage(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ message: 'Id is missing or invalid' });
      }

      const foundUser = await Users.findOne({ where: { id } });

      if (!foundUser) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ message: 'User not found' });
      }

      const usersNews = await News.findAll({ where: { userId: id } });

      return res
        .status(RESPONSE_STATUSES.OK)
        .send({
          user: {
            id: foundUser.id,
            login: foundUser.login,
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            registrationDate: foundUser.createdAt,
          },
          usersNews,
        });
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  },
};
