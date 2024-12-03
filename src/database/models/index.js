'use strict';

const fs = require('fs');

const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const Comment = require('./comment.model')(sequelize, Sequelize.DataTypes);
const Course  = require('./course.model')(sequelize, Sequelize.DataTypes);
const Unit = require('./unit.model')(sequelize, Sequelize.DataTypes);
const Question = require('./question.model')(sequelize, Sequelize.DataTypes);
const User = require('./user.model')(sequelize, Sequelize.DataTypes);
// const Test = require('./test.model')(sequelize, Sequelize.DataTypes);
db.User = User;
db.Course = Course;
db.Unit = Unit;
db.Question = Question;
db.Comment = Comment;
// db.Test = Test;
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    if(file === "test.model.js") return;
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

