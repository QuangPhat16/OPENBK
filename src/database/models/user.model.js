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
    }
    
  }
  User.init({
    id:{
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
      unique:true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('USER'||'COLLAB'||'ADMIN'),
      allowNull: false,
      defaultValue: 'USER'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{
    sequelize,
    modelName: 'User',
  });

  return User;
};

