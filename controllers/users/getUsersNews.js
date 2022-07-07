const { News } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async getUsersNews(req, res) {
    try {
      const userNews = await News
        .findAll({
          include: [{
            model: News,
            as: 'news',
          }],
          order: [
            ['createdAt', 'DESC'],
            [{ model: News, as: 'news' }, 'createdAt', 'DESC'],
          ],
        });
      return res
        .status(RESPONSE_STATUSES.OK).send(userNews);
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.BAD_REQUEST).send(error);
    }
  },
};
