const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    class Test extends Model {
        static associate(models) {
            this.belongsTo(models.Course, {foreignKey: 'courseID', as: 'course'});
            this.belongsTo(models.User, {foreignKey: 'userID', as: 'user'});
        }
    }

    Test.init({
        testID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        courseID: {
            type: DataTypes.STRING,
            references: {
                model: 'Course',
                key: 'courseID',
            },
            allowNull: false,
        },
        userID: {
            type: DataTypes.STRING,
            references: {
                model: 'User',
                key: 'userID',
            },
            allowNull: false,
        },
        takenDate:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        },
        correctAnswers: {
            type: DataTypes.INTEGER,
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
