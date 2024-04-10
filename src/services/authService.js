const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/userRepository');
const passport = require('passport');
const userRepository = new UserRepository();
class AuthService {

    async registerUser(userData) {
        const { username, userid, email, nickname, password, phone, zipNo, addr, addrDetail } = userData;
        
        // 이미 존재하는 사용자인지 확인
        try {
        const exUser = await userRepository.findUserByUserId(userid);

        if (exUser) {  
            throw new Error('User already exists');
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);

        // 사용자 생성
        await userRepository.createUser({
            username,
            userid,
            nickname,
            phone,
            zipNo,
            addr,
            addrDetail,
            email,
            password: hashedPassword,
        }); 
        return ({
            ok: 1,
            message: "Register success",
        });
        } catch (error) {
            throw error;
        }
    
        }

    async checkID(inputID) {
        try {
            const exUser = await userRepository.findUserByUserId(inputID);
            if(exUser){
                return({
                    ok: 0,
                    message: "이미 사용중인 아이디 입니다.",
                })
            }
            return({
                ok: 1,
                message: "사용 가능한 아이디 입니다.",
            })
        } catch(error){
            throw error;
        }
    }

    async checkNickName(inputNickName) {
        try {
            const exUser = await userRepository.findUserByNickName(inputNickName);
            if(exUser){
                return({
                    ok: 0,
                    message: "이미 사용중인 닉네임 입니다.",
                })
            }
            return({
                ok: 1,
                message: "사용 가능한 닉네임 입니다.",
            })
        } catch(error){
            throw error;
        }
    }

    async checkEmail(inputEmail) {
        try {
            const exUser = await userRepository.findUserByEmail(inputEmail);
            if(exUser){
                return({
                    ok: 0,
                    message: "이미 사용중인 이메일 입니다.",
                })
            }
            return({
                ok: 1,
                message: "사용 가능한 이메일 입니다.",
            })
        } catch(error){
            throw error;
        }
    }

    async checkPhone(inputPhone) {
        try {
            const exUser = await userRepository.findUserByPhone(inputPhone);
            if(exUser){
                return({
                    ok: 0,
                    message: "이미 사용중인 전화번호 입니다.",
                })
            }
            return({
                ok: 1,
                message: "사용 가능한 전화번호 입니다.",
            })
        } catch(error){
            throw error;
        }
    }
}
module.exports = AuthService;