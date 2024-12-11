'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Course, {
        through: models.Participate,
        foreignKey: 'userID',
      });
      this.hasMany(models.Course, {
        foreignKey: 'authorID',
        as: 'authoredCourses', 
      });
    }

  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userID: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('USER', 'COLLAB', 'ADMIN'),
      allowNull: false,
      defaultValue: 'USER'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};

