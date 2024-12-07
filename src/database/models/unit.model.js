const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Unit extends Model {
    static associate(models) {
      this.belongsTo(models.Course, { foreignKey: 'courseId' });
      this.hasMany(models.Question, { foreignKey: 'unitId' });
    }
  }

  Unit.init({
    unitId: {
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
      unique: true,
    },
    courseId: {
      type: DataTypes.UUID,
      references: {
        model: 'Course',
        key: 'courseId',
      },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Unit',
  });

  /**
   * Add a Sequelize hook to auto-increment `numericalOrder`.
   * This assumes `numericalOrder` increments independently for each `courseId`.
   */
  Unit.beforeCreate(async (unit, options) => {
    const maxOrder = await Unit.max('numericalOrder', {
      where: { courseId: unit.courseId },
    });
    unit.numericalOrder = (maxOrder || 0) + 1;
  });

  return Unit;
};
