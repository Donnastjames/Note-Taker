// Packages needed for this application
// https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// LOAD DATA
// We are linking our routes to a series of "data" sources.
// This data sources holds an array of information on notes data ...

const notes = require('../db/db.json');

const saveNotes = res => fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), err => {
  if (err) {
    console.error('Error writing to db.json:', err);
    res.json(false);
  } else {
    console.log('Successfully wrote to db.json');
    res.json(true);
  }
});


// ROUTING

module.exports = (app) => {
  // API GET Requests
  // When someone does a GET request, we respond by giving them the notes[] array.
  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // When a user POSTs /api/notes (a JSON object)
  // ...the JSON is pushed to the notes array
  // (ex. User adds a note... this data has been sent to the server...
  // Then the server writes the updated notes to the db.json file.
  // This way, when the app re-loads, the notes persist from the db.json file.
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {   
    // Stick a unique id into each newNote for keeping track of later.
    // We can't require('uuid') in code run on the client, so we must
    // do it here in the server ...
    const newNote = { ...req.body, id: uuidv4() };
    notes.push(newNote);
    saveNotes(res);
  });

  app.delete('/api/notes/:id', (req, res) => {
    const idToDelete = req.params.id;
    const indexToDelete = notes.findIndex(note => note.id === idToDelete);

    if (indexToDelete > -1) {
      // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
      notes.splice(indexToDelete, 1);
      saveNotes(res);
    } else {
      console.error(`Tried to delete id=${idToDelete} which doesn't exist!`);
      res.json(false);
    }
  });
}

