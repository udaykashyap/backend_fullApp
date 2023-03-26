const express = require('express');
const NoteModel = require('../Model/note.mode');
const jwt = require('jsonwebtoken');

const noteRoute = express.Router();

noteRoute.get('/', async (req, res) => {

    let token = req.headers.authorization;
    const decoded = jwt.verify(token, "Random")
    // console.log(decoded.userID)
    try {
        if (decoded) {
            let data = await NoteModel.find({ "userID": decoded.userID });
            res.status(200).send(data);
            // console.log(data)
        } else {
            res.send({ msg: "No Notes Available" })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
});

noteRoute.post('/add', async (req, res) => {

    try {
        let data = NoteModel(req.body);
        await data.save();
        res.status(200).send({ msg: "Note added successfully" })
    } catch (error) {
        res.status(500).send(error.message)
    }
});

noteRoute.patch('/update/:ID', async (req, res) => {

    const token = req.headers.authorization;
    const decode = jwt.decode(token, "Random");
    const ID = req.params.ID;
    const match1 = decode.userID
    const dataa = await NoteModel.findOne({ _id: ID });
    const match2 = dataa.userID;
    const payload = req.body

    if (match1 == match2) {
        await NoteModel.findByIdAndUpdate({ _id: dataa._id }, payload)
        res.send({ msg: "Update success" })
    } else {
        res.send({ msg: "Update failure" })
    }
    console.log(dataa)
    console.log(match1, match2)
    // res.send({ msg: "Update success" })

})

noteRoute.delete('/delete/:ID', async (req, res) => {

    let ID = req.params.ID
    let token = req.headers.authorization
    let decode = jwt.verify(token, "Random");
    let match1 = decode.userID;

    const data = await NoteModel.findOne({ _id: ID });
    const match2 = data.userID;

    if (match1 === match2) {
        await NoteModel.findByIdAndDelete({ _id: data._id })
        res.send("Delete success")
    } else {
        res.send("Not found")
    }


})

module.exports = { noteRoute }