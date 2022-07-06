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
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
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