const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'users'
      });
    }
  }
  News.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    tag: DataTypes.STRING,
    title: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};