const UserModel = require('../models/UserModel');
const generateAuthToken = require('../utils/generateAuthToken');
const { hashPassword, comparePassoword } = require('../Utils/hashPassword');
const {
    genericFunctionTosendJsonResponse
} = require('../Utils/ApiResponceUtils');

// REGISTER USER
const registerUsers = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!(name && email && password)) {
            res.status(400).send('Every Input Should Be Filled');
        }

        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res
                .status(400)
                .json({ error: 'User Already Exists With Email' });
        } else {
            const hashedPassword = hashPassword(password);

            const createdUser = new UserModel({
                name,
                email: email.toLowerCase(),
                password: hashedPassword
            });
            await createdUser.save();

            res.json(
                genericFunctionTosendJsonResponse(
                    'User Registerd SuccessFully',
                    createdUser
                )
            );
        }
    } catch (err) {
        next(err);
    }
};

// LoGIN USER
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send('All Inputs are Required');
        }

        const emailExist = await UserModel.findOne({ email });
        if (emailExist && comparePassoword(password, emailExist.password)) {
            let cookieParams = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            };

            return res
                .cookie(
                    'access_token',
                    generateAuthToken(emailExist.name, emailExist.email),
                    cookieParams
                )
                .json({
                    success: 'User Logged In',
                    userLoggedIn: {
                        email: emailExist.email,
                        name: emailExist.name
                    },
                    cookie: generateAuthToken(emailExist.name, emailExist.email)
                });
        } else {
            return res.status(401).send('Wrong Credentials');
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    registerUsers,
    loginUser
};
