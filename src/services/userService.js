const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const appConfig = require('../config/app_config');
const ValidationError = require('../exceptions/validationError');

class UserService {
    async register(username, password) {
        if (!username)
            throw new ValidationError('Invalid username.');
        if (!password)
            throw new ValidationError('Invalid password.');

        const userWithUsername = await userRepository.findByUsername(username);
        if (userWithUsername)
            throw new ValidationError('A user with that username already exists.');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepository.createUser({ username, password: hashedPassword });
        return user;
    }

    async login(username, password) {
        const user = await userRepository.findByUsername(username);
        if (!user) {
            throw new ValidationError('User not found.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ValidationError('Invalid password.');
        }

        const token = jwt.sign({ id: user.id }, appConfig.jwt.secret_key, { expiresIn: '24h' });
        return token;
    }

    async getUsers() {
        const users = await userRepository.getAll();
        const usersDto = users.map(user => ({
            id: user.id,
            username: user.username,
        }));

        return usersDto;
    }
}

module.exports = new UserService();