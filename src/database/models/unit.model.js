const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Unit extends Model {
    static associate(models) {
      this.belongsTo(models.Course, { foreignKey: 'courseID', as: 'course_units', onDelete: 'CASCADE' });
      this.hasMany(models.Question, { foreignKey: 'unitID', as: 'unit_questions' });
    }
  }

  Unit.init({
    unitID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    courseID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Course',
        key: 'courseID',
      },
    },
    numericalOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    numberOfQuestions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Unit',
    indexes: [{
      unique: true,
      fields: ['courseID', 'numericalOrder'],
      msg: 'Unit with this order already exists.',
    }]
  });

  return Unit;
};
