const { News } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async addNews(req, res) {
    try {
      const { id } = req.user;

      const {
        body: {
          content,
          tag,
          title,
        },
      } = req;

      if (!id) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ message: 'User is not authorized' });
      }

      const payload = {
        content: content.trim(),
        tag: tag.trim(),
        title: title.trim(),
      };

      if (
        payload.content === ''
      || payload.tag === ''
      || payload.title === '') {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send({ message: 'Missed data' });
      }

      const newNews = await News.create({
        userId: id,
        content,
        tag,
        title,
      });

      return res
        .status(RESPONSE_STATUSES.CREATED)
        .send(newNews);
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  },
};
