const Sequelize = require('sequelize');

module.exports = class Seller extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            sellername: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            userid: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
            nickname: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            adress: {
                type: Sequelize.STRING(300),
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
            modelName: 'Seller',
            tableName: 'sellers',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.hasMany(db.Product, {foreignKey: 'seller_id', sourceKey: 'id'});
    }
};