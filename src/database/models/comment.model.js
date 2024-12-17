const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: 'userID',
      });
    }
  }

  Comment.init({
    commentID: {
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
    userID: {
      type: DataTypes.STRING,
      references:{
        model: 'User',
        key: 'userID'
      },
      allowNull: false
    },
    parentID: {
      type: DataTypes.UUID,
      references:{
        model: 'Comment',
        key:'commentID'
      },
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Comment'
  });

  return Comment;
};