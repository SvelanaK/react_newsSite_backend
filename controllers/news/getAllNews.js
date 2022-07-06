const { News, User } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async getAllNews(req, res) {
    return News
      .findAll({
        include: [{
          model: User,
          as: 'user',
        }],
      })
      .then((allNews) => res.status(RESPONSE_STATUSES.OK).send(allNews))
      .catch((error) => { res.status(RESPONSE_STATUSES.BAD_REQUEST).send(error); });
  },
};
