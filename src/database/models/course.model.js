'use strict';
const { Model  } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      this.hasMany(models.Unit, { foreignKey: 'courseID', as: 'course_units' });
      this.hasOne(models.Preview, { foreignKey: 'userID', as: 'preview' });
      this.belongsToMany(models.User, {
        through: models.Participate,
        foreignKey: 'courseID',
        as: 'courseInfo',
      });
      this.belongsTo(models.User, {
        foreignKey: 'authorID',
        as: 'authorInfo',
        onDelete: 'CASCADE',
      });
    }
  }

  Course.init({
    courseID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    authorID: {
      type: DataTypes.STRING,
      references:{
        model: 'User',
        key: 'userID'
      },
      allowNull: false
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.ENUM('MATH', 'ENGLISH', 'CODE', 'ART', 'NONE'),
      defaultValue: 'NONE',
      allowNull: false,
    },
    price:{
      type: DataTypes.STRING,
      defaultValue: 'Free',
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Course',
  });

  return Course;
}
