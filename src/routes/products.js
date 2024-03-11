const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Product = require('../../models/product');
const { Seller } = require('../../models');

const router = express.Router();

try {
    fs.readdirSync('products');
}catch (err){
    console.log('products 폴더가 없어 products 폴더를 생성합니다.');
    fs.mkdirSync('products');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req,file,cb) {
            cb(null,'products/');
        },
        filename(req,file,cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname,ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5*1024*1024},
});


router.get('/', async(req, res, next)=>{
    try{
        const AllProducts = await Product.findAll({
            include: [{
                model: Seller,
                attributes: ['nickname']
            }],
        });
        res.status(200).send(AllProducts);
    } catch (err) {
        console.log(err);
        next(err);
    }

});

router.post('/register',upload.single('img_url'), async(req, res, next)=>{
    
    try{
        const {title,price,description,img_url,id} = req.body;
        const imageUrl = req.file.path;
        await Product.create({
            title,
            price,
            description,
            img_url:imageUrl,
            seller_id : id,
        });
        res.status(200).send("상품이 등록되었습니다.");
    } catch (err) {
        console.log(err);
        next(err);
    }

});

router.delete('/:id', async (req, res, next) => {
    try {
        // 제품 삭제 로직 구현
        res.status(200).send("상품이 삭제되었습니다.");
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;