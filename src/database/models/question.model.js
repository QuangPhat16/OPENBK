const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Question extends Model {
    static associate(models) {
      this.belongsTo(models.Unit, { foreignKey: 'unitId', });
    }
  }

  Question.init({
    questionId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    numericalOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    unitId: {
      type: DataTypes.UUID,
      references: {
        model: 'Unit',
        key: 'unitId',
      },
      allowNull: false,
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
  });

  return Question;
};
