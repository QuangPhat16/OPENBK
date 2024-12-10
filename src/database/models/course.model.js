const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {
    static associate(models) {
      this.hasMany(models.Unit, { foreignKey: 'courseId',});
      this.belongsTo(models.User, {foreignKey: 'userId;',});
    }
  }

  Course.init({
    courseId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4,
    },
    ownerId: {
      type: DataTypes.UUID,
      references:{
        model: 'User',
        key: 'userId'
      }
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createDate: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    price:{
      type: DataTypes.STRING,
      defaultValue: 'Free'
    },
  }, {
    sequelize,
    modelName: 'Course',
  });

  return Course;
};
