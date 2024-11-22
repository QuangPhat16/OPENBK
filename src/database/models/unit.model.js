const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Unit extends Model {
    static associate(models) {
      this.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });

      this.hasMany(models.Question, { foreignKey: 'unitId', as: 'questions' });
    }
  }

  Unit.init({
    unitId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    unitName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numericalOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Courses',
        key: 'courseId',
      },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Unit',
  });

  return Unit;
};
