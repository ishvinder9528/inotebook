const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all Notes Using GET=> http://localhost:5000/api/auth/fetchallnotes => login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Error Occured" })
    }

});


// ROUTE 2: Add a new Notes Using POST=> http://localhost:5000/api/auth/addnote => login required
router.post("/addnote", fetchuser, [
    body("title", "invalid title, enter more than 3 character").isLength({ min: 3, }),
    body("description", "invalid description, enter more than 5 character").isLength({ min: 5, }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // give error when there is some BAD request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save();

        res.json(saveNote);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Error Occured" })
    }
});

// ROUTE 3: Update an existing Notes Using PATCH=> http://localhost:5000/api/auth/updatenote/:id => login required
router.patch("/updatenote/:id", fetchuser, [
    body("title", "invalid title, enter more than 3 character").isLength({ min: 3, }),
    body("description", "invalid description, enter more than 5 character").isLength({ min: 5, }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body

        // give error when there is some BAD request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newNote = {}
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        // find the note in which the note goes to be updated
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        // update note
        let newData = await Note.findByIdAndUpdate(note.id, { $set: newNote }, { new: true })
        res.send(newData);


    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Error Occured" })
    }
});

// ROUTE 4: Delete a new Notes Using DELETE=> http://localhost:5000/api/auth/deletenote => login required
// router.delete("/deletenote/", fetchuser, async (req, res) => {
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // const {id}= req.body;

        // find the note in which the note goes to be delete
        // let note = await Note.findById(id);
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        // check the data of the logged in user
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        // const deleteNote = await Note.findByIdAndDelete(id)
        const deleteNote = await Note.findByIdAndDelete(note.id)
        res.status(200).send({message: "Deleted Successfully", deleteNote});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Error Occured" })
    }
});

module.exports = router;
