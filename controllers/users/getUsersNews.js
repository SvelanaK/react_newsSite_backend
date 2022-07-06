const { News } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async getUsersNews(req, res) {
    return News
      .findAll({
        include: [{
          model: News,
          as: 'news',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: News, as: 'news' }, 'createdAt', 'DESC'],
        ],
      })
      .then((userNews) => res.status(RESPONSE_STATUSES.OK).send(userNews))
      .catch((error) => { res.status(RESPONSE_STATUSES.BAD_REQUEST).send(error); });
  },
};
