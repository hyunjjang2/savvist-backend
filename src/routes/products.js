const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
    registerProduct,
    findAllProduct
} = require('../controllers/products')
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

router.get('/',findAllProduct)
router.post('/register',upload.single('img_url'),registerProduct)
// router.delete('/:id', async (req, res, next) => {
//     try {
//         // 제품 삭제 로직 구현
//         res.status(200).send("상품이 삭제되었습니다.");
//     } catch (err) {
//         console.log(err);
//         next(err);
//     }
// });

module.exports = router;