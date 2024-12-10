const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {
    static associate(models) {
      this.hasMany(models.Unit, { foreignKey: 'courseID',});
      this.belongsTo(models.User, {foreignKey: 'ownerID',});
    }
  }

  Course.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4,
    },
    courseID: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    ownerID: {
      type: DataTypes.STRING,
      references:{
        model: 'User',
        key: 'userID'
      },
      allowNull: false
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
