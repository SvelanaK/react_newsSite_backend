const { News, Users } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async getNewsSuccess(req, res) {
    try {
      const allNews = await News.findAll({
        include: [{
          model: Users,
          as: 'user',
          attributes: ['login', 'id'],
        }],
      });
      return res
        .status(RESPONSE_STATUSES.OK)
        .send(allNews);
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.BAD_REQUEST)
        .send(error);
    }
  },
};
