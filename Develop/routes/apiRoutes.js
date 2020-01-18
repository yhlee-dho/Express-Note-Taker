// requires
const db = require("../db/db.json");
const fs = require("fs");
const uuid = require("uuid/v4");

//express module functions
module.exports = function(app) {
  // get
  app.get("/api/notes", function(req, res) {
    res.send(db);
  }); 
  // post
  app.post("/api/notes", function(req, res) {

    let randomId = uuid();
    let newNote = {
      id: randomId,
      title: req.body.title,
      text: req.body.text
    };
    // read db.json
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      const savedNotes = JSON.parse(data);
      savedNotes.push(newNote);
      // write db.json
      fs.writeFile("./db/db.json", JSON.stringify(savedNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("Note created!")
      });
    });
  });

  // delete
  app.delete("/api/notes/:id", (req, res) => {
    // call db via id
    let randomId = req.params.id;
    // read db.json
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      const savedNotes = JSON.parse(data);
      const newSavedNotes = savedNotes.filter(note => note.id != randomId);

      // wrinte db.json
      fs.writeFile("./db/db.json", JSON.stringify(newSavedNotes, null, 2), err => {
        if (err) throw err;
        res.send(db);
        console.log("Note deleted!")
      });
    });
  });
};