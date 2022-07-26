require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Tokens } = require('../../models');

module.exports = {
  async generateTokens(id) {
    try {
      const accessToken = jwt.sign({ id }, process.env.SECRET_FOR_ACCESS, { expiresIn: '30m' });
      const refreshToken = jwt.sign({ id }, process.env.SECRET_FOR_REFRESH, { expiresIn: '31d' });
      await Tokens.create({
        refreshToken,
        userId: id,
      });
      return { accessToken, refreshToken };
    } catch (e) {
      return e.message;
    }
  },
};
