const { response } = require('express');
const fs = require('fs');
const notes = require('../db/db.json');
const path = require('path');
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  // get the database info to show saved notes
  app.get('/api/notes', (req, res) => {
    var dbNotes = fs.readFileSync('db/db.json', "utf8");
    console.log(dbNotes)
    var notesArr = JSON.parse(dbNotes);
    console.log(notesArr)
    res.json(notesArr)
  });

  // post notes
  app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    let newNote = {title, text, id: uuidv4()}

    let dbNotes = fs.readFileSync('db/db.json', "utf8");
    let notesArr = JSON.parse(dbNotes);
    notesArr = [...notesArr, newNote]
    
    fs.writeFileSync("db/db.json", JSON.stringify(notesArr))

    res.json(newNote);
  });

  // delete notes
  app.delete('/api/notes/:id',(req, res) => {
    let noteId = req.params.id;
    let dbNotes = fs.readFileSync('db/db.json', "utf8");
    let notesArr = JSON.parse(dbNotes);  
    let filterArr = notesArr.filter((note) => note.id !== noteId );

    fs.writeFileSync("db/db.json", JSON.stringify(filterArr))
   
    res.json({ok: true})
  });
}
