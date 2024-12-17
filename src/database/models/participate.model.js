'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participate = sequelize.define('Participate', {
    learnerID: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'userID',
      },
      allowNull: false,
    },
    courseID: {
      type: DataTypes.DATE, 
      references: {
        model: 'Course',
        key: 'courseID',
      },
      allowNull: false,
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('ENROLLED', 'COMPLETED', 'DROPPED'),
      defaultValue: 'ENROLLED',
    },
  }, {});

  Participate.associate = function (models) {
    Participate.belongsTo(models.User, { 
      foreignKey: 'learnerID',
      as: 'learnerParticipates',
    });
    Participate.belongsTo(models.Course, { 
      foreignKey: 'courseID',
      as: 'courseLearned',
     });
  };

  return Participate;
};

