const { User } = require('../models');
const { News } = require('../models');
const { RESPONSE_STATUSES } = require('../constants');

module.exports = {
  getUsersNews(req, res) {
    return News
      .findAll({
        include: [{
          model: News,
          as: 'news'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: News, as: 'news' }, 'createdAt', 'DESC'],
        ],
      })
      .then((userNews) => res.status(RESPONSE_STATUSES.OK).send(userNews))
      .catch((error) => { res.status(RESPONSE_STATUSES.BAD_REQUEST).send(error); });
  },

  addNews(req, res) {
    return News
      .create({
        content: req.body.content,
        tag: req.body.tag,
        title: req.body.title,
      }, {
        include: [{
          model: News,
          as: 'news'
        }],
      })
      .then((addNews) => res.status(RESPONSE_STATUSES.CREATE).send(addNews))
      .catch((error) => res.status(RESPONSE_STATUSES.BAD_REQUEST).send(error));
  },

  addUser(req, res) {
    return News
      .create({
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        picture: req.body.picture,
      })
      .then((addUser) => res.status(RESPONSE_STATUSES.CREATE).send(addUser))
      .catch((error) => res.status(RESPONSE_STATUSES.BAD_REQUEST).send(error));
  },

  changeUserInfo(req, res) {
    const { name, picture } = req.body;
    return User
      .findByPk(req.params.userId)
      .then((response) => {
        if (response) {
          User
            .update(
              { name, picture },
              { where: { useId: req.params.userId } },
            )
            .then(() => res.status(RESPONSE_STATUSES.OK).send());
        } else {
          throw new Error();
        }
      })
      .catch((error) => res.status(RESPONSE_STATUSES.BAD_REQUEST).send(error));
  },

};

