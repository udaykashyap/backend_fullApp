
const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const UserModel = require('../Model/user.model');

const userRoute = express.Router();

userRoute.post('/register', async (req, res) => {
    const { email, password, age, location } = req.body;

    try {
        bcrypt.hash(password, 3, async (err, hash) => {
            // Store hash in your password DB.
            let user = UserModel({ email, password: hash, age, location })
            await user.save()
            res.status(200).send({ msg: "user added successfully" })
        });
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

userRoute.post('/login', async (req, res) => {

    const { email, password } = req.body
    const user = await UserModel.findOne({ email });

    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            // result == true

            if (result) {
                res.status(200).send({ msg: "Login successful", token: jwt.sign({ "userID": user._id }, 'Random') })
            } else {
                res.status(403).send({ msg: "Login failed" })
            }
        });
    }


});

module.exports = { userRoute };