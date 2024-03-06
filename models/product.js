const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER(15),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            img_url: {
                type: Sequelize.STRING(600),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Product',
            tableName: 'products',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Product.belongsTo(db.Seller, {foreignKey: 'seller_id', targetKey: 'id'});
        db.Product.hasMany(db.Product_in_order, {foreignKey: 'product_id', sourceKey: 'id'});
    }
};