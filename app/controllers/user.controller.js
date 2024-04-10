const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");

exports.signUp = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next(new ApiError(400, 'Email and password are required'));
    }

    try {
        const user = new UserService(MongoDB.client)
        const result = await user.signUp(req.body);
        res.send(result);   
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.signIn = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next(new ApiError(400, 'Email and password are required'));
    }

    try {
        const user = new UserService(MongoDB.client)
        const result = await user.signIn(req.body);
        res.send(result);
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

exports.home = (req, res) => {
    res.send({message: 'welcome to clothes application'});
}