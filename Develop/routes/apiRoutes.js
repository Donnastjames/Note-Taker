// Package needed for this application
const { json } = require('body-parser');
// https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// LOAD DATA
// We are linking our routes to a series of "data" sources.
// This data sources holds an array of information on notes data ...

const notes = require('../db/db.json');

console.log('requiring notes gave rise to:\n', JSON.stringify(notes, null, 2));

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // When someone does a GET request, we respond by giving them the notes[] array.
  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => {
    console.log('GET /api/notes called');
    console.log('req.params:\n', JSON.stringify(req.params, null, 2));
    console.log('req.body:\n', JSON.stringify(req.body, null, 2));
    console.log('returning notes:\n', JSON.stringify(notes, null, 2));
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
    console.log('POST /api/notes called');
    console.log('req.params:\n', JSON.stringify(req.params, null, 2));
    console.log('req.body:\n', JSON.stringify(req.body, null, 2));
   
    // Stick a unique id into each newNote for keeping track of later.
    // We can't require('uuid') in code run on the client, so we must
    // do it here in the server ...
    const newNote = { ...req.body, id: uuidv4() };
    notes.push(newNote);
    console.log('notes just became:\n', JSON.stringify(notes, null, 2));

    fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), err => {
      if (err) {
        console.error('Error writing to db.json:', err);
        res.json(false);
      } else {
        console.log('Successfully wrote to db.json');
        res.json(true);
      }
    });
  });
}

  // I added this below code so you could clear out the table while working with the functionality.

//   app.post('/api/clear', (req, res) => {
//     // Empty out the arrays of data
//     tableData.length = 0;
//     waitListData.length = 0;

//     res.json({ ok: true });
//   });

