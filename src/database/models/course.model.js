const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {
    static associate(models) {
      this.hasMany(models.Unit, { foreignKey: 'courseID', as: 'units' });
      this.hasOne(models.Preview, { foreignKey: 'userID', as: 'preview' });
      this.belongsToMany(models.User, {
        through: models.Participate,
        foreignKey: 'courseID',
      });
      this.belongsTo(models.User, {
        foreignKey: 'authorID',
        as: 'author', 
      });
    }
  }

  Course.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    courseID: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    authorID: {
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
    imageUrl: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.ENUM('MATH', 'ENGLISH', 'CODE', 'ART'),
      allowNull: false,
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
}
