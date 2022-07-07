require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATA_BASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
