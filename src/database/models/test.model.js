const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Test extends Model {
        static associate(models) {
            this.belongsTo(models.User, {foreignKey: 'userId;',});
        }
    }

    Test.init({
        testId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        courseId: {
            type: DataTypes.UUID,
            references: {
                model: 'Course',
                key: 'courseId',
            },
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'userId',
            },
            allowNull: false,
        },
        takenDate:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        },
        correctAnswers: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numberOfQuestions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        //seconds
        takenTime: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        score: {
            type: DataTypes.DECIMAL(1),
            allowNull:false
        },
    }, {
        sequelize,
        modelName: 'Test',
    });
    return Test;
};
