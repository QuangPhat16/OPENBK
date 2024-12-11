'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

  }
  Participate.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Participate',
  });
  return Participate;
};