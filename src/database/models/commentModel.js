const { Model, DataTypes } = require('sequelize');
const sequelize = require('../src/database');

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Comment'
});

Comment.associate = (models) => {
  Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Comment.hasMany(models.Comment, { foreignKey: 'parentId', as: 'replies' });
};

module.exports = Comment;