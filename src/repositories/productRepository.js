const Product = require("../models/product");
const Seller = require("../models/seller");
class ProductRepository {
    /* 메서드 이름은 목적이 드러나게 작성해야 됩니다. */
    async registerProduct(productData) {
        console.log(productData);
        return await Product.create(productData);
    }
    async findAllProduct() {
        return await Product.findAll({
            include: [{
                model: Seller,
                attributes: ['nickname']
            }],
        });
    }
    }


module.exports = ProductRepository;