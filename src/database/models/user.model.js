const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Course, {
        through: models.Participate,
        foreignKey: 'learnerID',
        as: 'learnerInfo',
      });
      this.hasMany(models.Course, {
        foreignKey: 'authorID',
        as: 'authorInfo',         
      });
    }

  }
  User.init({
    userID: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('LEARNER', 'COLLAB', 'ADMIN'),
      allowNull: false,
      defaultValue: 'LEARNER',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};

