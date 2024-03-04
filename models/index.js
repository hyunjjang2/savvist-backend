const Sequelize = require('sequelize');
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);

db.sequelize = sequelize;

db.User = User;


User.init(sequelize); // 각각의 모델의 static.init 메서드를 호출함, init이 실행되어야 테이블이 모델로 연결된다!!


// User.associate(db); //얘는 다른 테이블과의 관계를 연결하는 것



module.exports = db;
