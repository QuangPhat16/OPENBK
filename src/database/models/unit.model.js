const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Unit extends Model {
    static associate(models) {
      this.belongsTo(models.Course, { foreignKey: 'courseID', as: 'course'  });
      this.hasMany(models.Question, { foreignKey: 'unitID', as: 'questions' });
    }
  }

  Unit.init({
    unitID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    unitName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numericalOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // autoIncrement: true,
      unique: true,
    },
    courseID: {
      type: DataTypes.STRING,
      references: {
        model: 'Course',
        key: 'courseID',
      },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Unit',
  });
  Unit.beforeCreate(async (unit, options) => {
    const maxOrder = await Unit.max('numericalOrder', {
      where: { courseID: unit.courseID },
    });
    unit.numericalOrder = (maxOrder || 0) + 1;
  });

  return Unit;
};
