const Sequelize = require('sequelize');
const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Product_in_order = require('./product_in_order');
const Seller = require('./seller');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);

db.sequelize = sequelize;

db.User = User;
db.Product = Product;
db.Order = Order;
db.Product_in_order = Product_in_order;
db.Seller = Seller;

User.init(sequelize); // 각각의 모델의 static.init 메서드를 호출함, init이 실행되어야 테이블이 모델로 연결된다!!
Product.init(sequelize);
Order.init(sequelize);
Product_in_order.init(sequelize);
Seller.init(sequelize);

User.associate(db); //얘는 다른 테이블과의 관계를 연결하는 것
Product.associate(db);
Order.associate(db);
Product_in_order.associate(db);
Seller.associate(db);



module.exports = db;
