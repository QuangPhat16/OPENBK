'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Course, {
        through: models.Participate,
        foreignKey: 'userId',
      });
      this.hasMany(models.Course, {
        foreignKey: 'authorId', // Trường này sẽ là authorId trong bảng Course
        as: 'authoredCourses', // Tên alias cho mối quan hệ
      });
    }

  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
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
    name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `name` value directly.');
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};