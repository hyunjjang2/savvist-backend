const User = require("../models/user");

class UserRepository {
    /* 메서드 이름은 목적이 드러나게 작성해야 됩니다. */
    async createUser(userData) {
        return await User.create(userData);
    }
    
    async findUserByUserId(userid) {
        return await User.findOne({ where: { userid } });
    }
}


module.exports = UserRepository;
