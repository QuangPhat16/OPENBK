'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participate = sequelize.define('Participate', {
    learnerID: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'userID',
      },
      primaryKey: true,
      allowNull: false,
    },
    courseID: {
      type: DataTypes.STRING, 
      references: {
        model: 'Course',
        key: 'courseID',
      },
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'COMPLETED', 'DROPPED'),
      defaultValue: 'ACTIVE',
    },
  }, {});

  Participate.associate = function (models) {
    Participate.belongsTo(models.User, { 
      foreignKey: 'learnerID',
      as: 'learnerInfo',
      onDelete: 'CASCADE',
    });
    Participate.belongsTo(models.Course, { 
      foreignKey: 'courseID',
      as: 'courseInfo',
      onDelete: 'CASCADE',
     });
  };

  return Participate;
};

