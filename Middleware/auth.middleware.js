
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



const auth = (req, res, next) => {
    let token = req.headers.authorization
    try {
        if (token) {
            const decoded = jwt.verify(token, 'Random');
            // console.log(decoded)
            req.body.userID = decoded.userID
            if (decoded) {

                next();
            } else {
                res.status(400).send({ msg: "login failed" })
            }
            // decoded ?  next() : res.status(400).send({ msg: "login failed" })
        } else {
            res.status(401).send({ msg: "Login first" })
        }
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = { auth }