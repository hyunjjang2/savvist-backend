const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const {username, userid, email, nickname, password,phone,zipNo,addr,addrDetail} = req.body;
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
            zipNo,
            addr,
            addrDetail,
            email,
            password: hash,
        });
        res.status(200).send("회원가입 완료");
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

router.get('/logout', (req, res, next) => {
    req.logOut(err => {
      if (err) {
        return next(err);
      } else {
        res.status(200).send("로그아웃 성공");
      }
    });
  });
//로그인 유무 확인하고 유저 정보 반환해주는 api
router.get('/user',isLoggedIn ,(req, res) => {
    
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(401).json({ error: '인증 실패' });
    }
  });


module.exports = router;