const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try {
        const { username, profile, email, password } = req.body;
        if (await userModel.findOne({ email })) {
            res.status(409).json({ message: "user already created" });
            return;
        }
        if (profile) {
            const newUser = new userModel({ username, profile, email, password });
            await newUser.save();
            res.status(201).json(newUser);
        }
        else {
            const newUser = new userModel({ username, email, password });
            await newUser.save();
            res.status(201).json(newUser);
        }
    }
    catch (error) {
        res.json({ message: "something went wrong" });
    };
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user && user.password == password) {
            user.password = "";
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            console.log(token);
            res.cookie("token", token);
            res.status(200).json([ user , token ]);
        }
        else {
            res.status(404).json({ message: "User not found please sign up first" });
        }
    }
    catch (error) {
        console.log(error);
    };
}

const getUser = async (req, res) => {

}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

module.exports = { createUser, LoginUser }