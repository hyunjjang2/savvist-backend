const Sequelize = require('sequelize');

module.exports = class Order extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Order',
            tableName: 'orders',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Order.belongsTo(db.Seller, {foreignKey: 'user_id', targetKey: 'id'});
        db.Order.hasMany(db.Product_in_order, {foreignKey: 'order_id', sourceKey: 'id'});
    }
};