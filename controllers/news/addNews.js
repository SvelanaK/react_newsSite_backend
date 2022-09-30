const { News } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');
const { ERROR_MESSAGE } = require('../../errorMessages');

module.exports = {
  async addNews(req, res) {
    try {
      const {
        user: {
          id,
        },
        files: {
          picture,
        },
        body: {
          content,
          tag,
          title,
        },
      } = req;

      await picture.mv(`public/images/${picture.name}`);

      const payload = {
        content: content.trim(),
        tag: tag.trim(),
        title: title.trim(),
        userId: id,
        picture: picture.name,
      };

      const hasMissData = payload.content === ''
        || payload.tag === ''
        || payload.title === '';

      if (hasMissData) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send(ERROR_MESSAGE.MISSED_DATA);
      }

      const newNews = await News.create(payload);

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
