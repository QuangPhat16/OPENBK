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
    userID: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
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
    profileUrl: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};

