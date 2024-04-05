const Sequelize = require('sequelize');

module.exports = class Product_in_order extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Product_in_order',
            tableName: 'products_in_order',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Product_in_order.belongsTo(db.Order, {foreignKey: 'order_id', targetKey: 'id'});
        db.Product_in_order.belongsTo(db.Product, {foreignKey: 'product_id', targetKey: 'id'});
    }
};