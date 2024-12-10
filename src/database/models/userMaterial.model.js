'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
    
  }
  Material.init({
      id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data: {
        type: DataTypes.BLOB('long'),
        allowNull:false
      },
      seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userID: {
        type: DataTypes.STRING,
        references:{
          model:'User',
          key:'userID'
        },
        allowNull: false
      },
      courseID: {
        type: DataTypes.STRING,
        references: {
          model: 'Course',
          key: 'courseID',
       },
        allowNull: false
      }, 
   },{
    sequelize,
    modelName: 'Material',
  });
  return Material;
};