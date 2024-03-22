const express = require('express');
const User = require('../../models/user');

const router = express.Router();

router.get('/', async(req, res, next)=>{
    try{
        const users = await User.findAll();
        res.send("안녕하시와요");
    } catch (err) {
        console.error(err);
        next(err);
    }

});

module.exports = router;