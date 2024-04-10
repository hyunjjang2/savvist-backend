const AuthService = require("../services/authService");
const passport = require('passport');
const authService = new AuthService();

const registerUser = async (req, res, next) => {

    const userData = req.body;
    try {
        const RegisterData = await authService.registerUser(userData);
        res.status(200).send("회원가입 완료");
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

const login = async (req, res, next) => {
        
        passport.authenticate('local' , (authError, user, info) => {
            if(authError) {
                console.error(authError);
                return next(authError);
            }
            if (!user) {
                return res.status(401).json({
                    message: "가입되지 않은 회원입니다.",
                })
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
    }

const checkID = async (req, res, next) => {
    const inputID = req.body.userid;
    try{
    const checkUserData = await authService.checkID(inputID);
    if(checkUserData.ok) {
        return res.status(200).json({
            message: checkUserData.message,
        })
    }
    else {
        return res.status(409).json({
            message: checkUserData.message,
        })
    }
    } catch(error){
        return res.status(500).json({
            message: error.message,
        })
    }
}

const checkNickName = async (req, res, next) => {
    const inputNickName = req.body.nickname;
    try{
    const checkUserData = await authService.checkNickName(inputNickName);
    if(checkUserData.ok) {
        return res.status(200).json({
            message: checkUserData.message,
        })
    }
    else {
        return res.status(409).json({
            message: checkUserData.message,
        })
    }
    } catch(error){
        return res.status(500).json({
            message: error.message,
        })
    }
}

const checkEmail = async (req, res, next) => {
    const inputEmail = req.body.email;
    try{
    const checkUserData = await authService.checkEmail(inputEmail);
    if(checkUserData.ok) {
        return res.status(200).json({
            message: checkUserData.message,
        })
    }
    else {
        return res.status(409).json({
            message: checkUserData.message,
        })
    }
    } catch(error){
        return res.status(500).json({
            message: error.message,
        })
    }
}

const logout = (req,res,next) => {
    try{
        req.logOut(err => {
            if (err) {
              return next(err);
            } else {
              res.status(200).send("로그아웃 성공");
            }
          });
    } catch(error){
        console.error(error);
        return next(error);
    }
}

const getUserInfo = (req, res, next) => {
    
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(401).json({ error: '인증 실패' });
    }
      
}

module.exports = {
    registerUser,
    login,
    checkID,
    checkNickName,
    checkEmail,
    logout,
    getUserInfo
}