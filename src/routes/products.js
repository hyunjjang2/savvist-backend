const express = require('express');
const Product = require('../../models/product');

const router = express.Router();

router.post('/register', async(req, res, next)=>{
    try{
        //제품 등록 로직 구현
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