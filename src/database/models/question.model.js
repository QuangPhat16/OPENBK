const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Question extends Model {
    static associate(models) {
      this.belongsTo(models.Unit, { foreignKey: 'unitId', as: 'unit' });
    }
  }

  Question.init({
    questionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.INTEGER,
      references: {
        model: 'Units',
        key: 'unitId',
      },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Question',
  });

  return Question;
};
