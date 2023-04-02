const jwt = require('jsonwebtoken');
const expiryTime = new Date().getTime() + 3600 * 1000;

const generateAuthToken = (name, email) => {
    return jwt.sign(
        { name, email, exp: Math.floor(expiryTime / 1000) },
        process.env.SECRET_TOKEN
    );
};

module.exports = generateAuthToken;
