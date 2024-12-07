const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: 'UserId',
      });
    }
  }

  Comment.init({
    commentId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
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
      type: DataTypes.UUID,
      references:{
        model: 'User',
        key: 'userId'
      },
      allowNull: false
    },
    parentId: {
      type: DataTypes.UUID,
      references:{
        model: 'Comment',
        key:'commentId'
      },
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Comment'
  });

  return Comment;
};