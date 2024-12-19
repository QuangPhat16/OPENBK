const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Question extends Model {
    static associate(models) {
      this.belongsTo(models.Unit, {
        foreignKey: 'unitID', 
        as: 'unit_questions', 
        onDelete: 'CASCADE' 
      });
    }
  }

  Question.init({
    questionID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    unitID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numericalOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
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
  }, {
    sequelize,
    modelName: 'Question',
    indexes: [{
      unique: true,
      fields: ['unitID', 'numericalOrder'],
      msg: 'Question with this order already exists.',
    }]
  });

  return Question;
};
