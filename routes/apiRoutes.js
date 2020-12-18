const { response } = require('express');
const fs = require('fs');
const notes = require('../db/db.json');
const path = require('path');
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    var dbNotes = fs.readFileSync('db/db.json', "utf8");
    console.log(dbNotes)
    var notesArr = JSON.parse(dbNotes);
    console.log(notesArr)
    res.json(notesArr)
  });

  app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    var newNote = {title, text, id: uuidv4()}
    console.log(newNote);

   var dbNotes = fs.readFileSync('db/db.json', "utf8");
   var notesArr = JSON.parse(dbNotes);

   
   notesArr = [...notesArr, newNote]
   fs.writeFileSync("db/db.json", JSON.stringify(notesArr))

    res.json(newNote);
    
  });

  app.delete('/api/notes/:id',(req, res) => {
    let noteId = req.params.id;
    var dbNotes = fs.readFileSync('db/db.json', "utf8");
    var notesArr = JSON.parse(dbNotes);  
   let filterArr = notesArr.filter((note) => note.id !== noteId );
   fs.writeFileSync("db/db.json", JSON.stringify(filterArr))
   console.log("FILTER", filterArr)
    res.json({ok: true})
  });
}
