const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares/verifyLoggedin');
const {
    registerUser,
    login,
    checkUser,
    logout,
    getUserInfo,
  } = require("../controllers/auth");

const router = express.Router();

router.post('/join', isNotLoggedIn, registerUser);
router.post('/checkid', checkUser);
router.post('/login', isNotLoggedIn, login );
router.get('/logout',isLoggedIn,logout)
router.get('/user',isLoggedIn, getUserInfo);

module.exports = router;