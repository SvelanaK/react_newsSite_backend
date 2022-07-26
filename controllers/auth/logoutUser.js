const { Tokens } = require('../../models');
const { RESPONSE_STATUSES } = require('../../constants');

module.exports = {
  async logoutUser(req, res) {
    try {
      const { refreshToken } = await req.cookies;
      await Tokens.destroy(
        { where: { refreshToken } },
      );
      return res
        .clearCookie('refreshToken', { secure: true, httpOnly: true })
        .status(RESPONSE_STATUSES.OK)
        .send();
    } catch (error) {
      return res
        .status(RESPONSE_STATUSES.BAD_REQUEST)
        .send(error);
    }
  },
};
