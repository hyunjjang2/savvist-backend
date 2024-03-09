const express = require('express');
const Product = require('../../models/product');

const router = express.Router();

router.post('/register', async(req, res, next)=>{
    try{
        const {title,price,description,img_url,id} = req.body;
        await Product.create({
            title,
            price,
            description,
            img_url,
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