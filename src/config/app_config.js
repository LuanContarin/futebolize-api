require('dotenv').config({ path: 'src/environment/.env' });

const appConfig = {
    development: {
        url: process.env.BASE_URL || 'http://localhost',
        port: process.env.PORT || 3000,
        jwt: {
            secret_key: process.env.JWT_SECRET_KEY,
        },
    },
    production: {
        url: process.env.BASE_URL,
        port: process.env.PORT,
        jwt: {
            secret_key: process.env.JWT_SECRET_KEY,
        },
    },
};

// Determine the current environment
const env = process.env.NODE_ENV || 'development';

module.exports = appConfig[env];