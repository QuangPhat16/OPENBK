const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Test extends Model {
        static associate(models) {
            this.belongsTo(models.Course, {foreignKey: 'courseId', as: 'course'});
            this.belongsTo(models.User, {foreignKey: 'userId;', as: 'user'});
        }
    }

    Test.init({
        testId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        courseId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Courses',
                key: 'courseId',
            },
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'userId',
            },
            allowNull: false,
        },
        takenDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        correctAnswers: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        numberOfQuestions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Test',
    });

    return Test;
};
