const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const {username, userid, email, nickname, password,phone,adress} = req.body;
    try {
        const exUser = await User.findOne({where: { userid }});
        console.log(exUser);
        if(exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            username,
            userid,
            nickname,
            phone,
            adress,
            email,
            password: hash,
        });
        return res.redirect('/');
    }   catch (error) {
        console.error(error);
        return next(error);
    }
});

//아이디 중복확인 api
router.post('/checkid',async(req, res, next)=> {
    try {
        const {userid} = req.body;
        const exID = await User.findOne({where: {userid} });
        if (exID) {
            return res.status(500).send('사용중인 아이디입니다.');
        } else {
            return res.status(200).send('사용 가능한 아이디입니다.');
        }
    } catch (err){
        console.error(err);
        return next(err);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local' , (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect('/not-found');
        }
        return req.login(user, (loginError)=> {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            const userInfo = {
                userid : user.userid,
                username: user.username,
            };
            // 클라이언트에게 사용자 정보를 응답
            res.status(200).json(userInfo);

        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;