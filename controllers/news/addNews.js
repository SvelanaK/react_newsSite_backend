const { News, Tokens } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');
const { ERROR_MESSAGE } = require('../../errorMessages');

module.exports = {
  async addNews(req, res) {
    try {
      const {
        cookies: {
          cookieRefreshToken,
        },
        body: {
          content,
          tag,
          title,
        },
      } = req;

      if (!cookieRefreshToken) {
        return res
          .status(RESPONSE_STATUSES.UNAUTHORIZED)
          .send(ERROR_MESSAGE.USER_UNAUTHORIZED);
      }
      const foundUserToken = await Tokens.findOne(
        { where: { refreshToken: cookieRefreshToken } },
      );

      if (!foundUserToken) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send(ERROR_MESSAGE.TOKEN_NOT_FOUND);
      }

      const payload = {
        content: content.trim(),
        tag: tag.trim(),
        title: title.trim(),
      };

      const validationText = (payload.content === '' || payload.tag === '' || payload.title === '');

      if (validationText) {
        return res
          .status(RESPONSE_STATUSES.BAD_REQUEST)
          .send(ERROR_MESSAGE.MISSED_DATA);
      }

      const newNews = await News.create({
        userId: foundUserToken.userId,
        content: payload.content,
        tag: payload.tag,
        title: payload.title,
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
