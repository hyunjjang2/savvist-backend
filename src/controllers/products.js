const ProductService = require("../services/productService");
const productService = new ProductService();


const registerProduct = async (req, res, next) => {
    const productData = req.body;
    productData.img_url = req.file.path;
    console.log(productData);
    try{
        const RegisterData = await productService.registerProduct(productData);
        if (RegisterData.ok){
            return res.status(200).json({
                message: RegisterData.message,
            })
        }
    }catch(error){
        return res.status(500).json({
            message: error.message,
        })
    }
}

const findAllProduct = async (req, res, next) => {
    try{
        const FindProductData = await productService.findAllProduct();
        const products = FindProductData.products;
        return res.send(products);
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: error.message,
        })
    }
}


module.exports = {
    registerProduct,
    findAllProduct
}
