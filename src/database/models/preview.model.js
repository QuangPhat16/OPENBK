const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Preview extends Model {
    static associate(models) {
      this.belongsTo(models.Course, { foreignKey: 'courseID', as: 'course'});
    }
  }

  Preview.init({
    previewId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descriptionHeader: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    descriptionFull: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    objective: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
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
    modelName: 'Preview',
  });

  return Preview
};
