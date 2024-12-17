'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
  }
  contQuestion.init({
      contQuestionID:{
         type: DataTypes.UUID,
         primaryKey: true,
         defaultValue: DataTypes.UUIDV4,
      },
      content: {
         type: DataTypes.TEXT,
         allowNull:false
      },
      explanation: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      userID: {
         type: DataTypes.STRING,
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
      correctAnswer: {
         type: DataTypes.ENUM('A', 'B', 'C', 'D'),
         allowNull: false,
      },
      answerA: {
         type: DataTypes.TEXT,
         allowNull:false
      },
      answerB: {
         type: DataTypes.TEXT,
         allowNull:false
      },
      answerC: {
         type: DataTypes.TEXT,
         allowNull:false
      },
      answerD: {
         type: DataTypes.TEXT,
         allowNull:false
      },
   },{
   sequelize,
   modelName: 'contQuestion',
  });
  return contQuestion;
};