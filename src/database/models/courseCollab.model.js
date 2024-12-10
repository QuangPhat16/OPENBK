'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courseCollab extends Model {
    static associate(models) {
      // define association here
    }
    
  }
  courseCollab.init({
      collabID: {
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
    modelName: 'courseCollab',
  });
  return courseCollab;
};