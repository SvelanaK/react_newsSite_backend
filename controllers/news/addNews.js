const { News } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async addNews(req, res) {
    try {
      const addNews = await News
        .create({
          content: req.body.content,
          tag: req.body.tag,
          title: req.body.title,
        }, {
          include: [{
            model: News,
            as: 'news',
          }],
        });
      return res
        .status(RESPONSE_STATUSES.CREATED)
        .send(addNews);
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.BAD_REQUEST)
        .send(error);
    }
  },
};
