const User = require('../models/user');

class UserRepository {
    async createUser(user) {
        return await User.create(user);
    }

    async findByUsername(username) {
        return await User.findOne({ where: { username } })
    }

    async getAll() {
        return await User.findAll();
    }
}

module.exports = new UserRepository();