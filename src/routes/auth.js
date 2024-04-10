const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares/verifyLoggedin');
const {
    registerUser,
    login,
    checkID,
    checkNickName,
    checkEmail,
    checkPhone,
    logout,
    getUserInfo,
  } = require("../controllers/auth");

const router = express.Router();

router.post('/join', isNotLoggedIn, registerUser);
router.post('/checkid', checkID);
router.post('/checknickname', checkNickName);
router.post('/checkemail', checkEmail);
router.post('/checkphone', checkPhone);
router.post('/login', isNotLoggedIn, login );
router.get('/logout',isLoggedIn,logout)
router.get('/user',isLoggedIn, getUserInfo);

module.exports = router;