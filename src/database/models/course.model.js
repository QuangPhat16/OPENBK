const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {
    static associate(models) {
      this.hasMany(models.Unit, { foreignKey: 'courseId', as: 'units' });
      this.hasOne(models.Preview, { foreignKey: 'userId', as: 'preview' });
      this.belongsToMany(models.User, {
        through: models.Participate,
        foreignKey: 'courseId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'authorId',
        as: 'author', // Alias cho quan hệ
      });
    }
  }

  Course.init({
    courseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    authorId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Course',
  }
  )

  Course.beforeCreate(async (course) => {
    try {
      // Fetch all existing courseIds in ascending order
      const courses = await Course.findAll({
        attributes: ['courseId'],
        order: [['courseId', 'ASC']],
      });

      // Find the first missing courseId in the sequence
      let newCourseId = 1;
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].courseId !== newCourseId) {
          break;
        }
        newCourseId++;
      }

      // Set the new course's courseId to the first missing courseId
      course.courseId = newCourseId;
    } catch (error) {
      console.error('Error in beforeCreate hook:', error);
      throw error;
    }
  }
  )

  return Course;
}
