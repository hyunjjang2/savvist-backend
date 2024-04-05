const ProductRepository = require('../repositories/productRepository');
const productRepository = new ProductRepository();

class ProductService {

    async registerProduct(productData) {
        const {title,price,description,seller_id,img_url} = productData;
        try {
            await productRepository.registerProduct(productData);
            return ({
                ok: 1,
                message: "Register success",
            });
         }catch(error) {
            throw error;
         }
    }

    async findAllProduct() {
        try {
            const Products = await productRepository.findAllProduct();
            return ({
                ok: 1,
                message: "success",
                products: Products
            })
        }catch(error) {
            throw error;
        }
    }
}

module.exports = ProductService;