'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courseCollab extends Model {
    static associate(models) {
      // define association here
    }
    
  }
  courseCollab.init({
      collabId: {
        type: DataTypes.UUID,
        references:{
           model:'User',
           key:'userId'
        },
        allowNull: false
      },
      courseId: {
        type: DataTypes.UUID,
        references: {
           model: 'Course',
           key: 'courseId',
       },
        allowNull: false
      }, 
   },{
    sequelize,
    modelName: 'courseCollab',
  });
  return courseCollab;
};