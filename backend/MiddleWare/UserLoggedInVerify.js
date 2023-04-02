const jwt = require('jsonwebtoken');

const verifyIsLoggedIn = async (req, res, next) => {
    try {
        console.log('This is req');
        if (!req.cookies.access_token) {
            res.status(403).send(
                'Please Provide Auth Token To Access Resoruce'
            );
        } else {
            try {
                const decode = jwt.verify(req.cookies.access_token, 'SECRET');
                if (decode) {
                    req.user = decode;
                    next();
                }
            } catch (err) {
                res.status(401).send(
                    'Please Provide Valid Auth Token To Access Resource'
                );
            }
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { verifyIsLoggedIn };
