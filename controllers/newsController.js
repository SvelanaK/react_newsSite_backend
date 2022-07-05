const { News } = require('../models');
const { RESPONSE_STATUSES } = require('../constants');

module.exports = {
  getAllNews(req, res) {
    return News
      .findAll()
      .then((allNews) => res.status(RESPONSE_STATUSES.OK).send(allNews))
      .catch((error) => { res.status(RESPONSE_STATUSES.BAD_REQUEST).send(error); });
  },
};