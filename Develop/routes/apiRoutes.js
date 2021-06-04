// Package needed for this application
const fs = require('fs');

// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on notes data

const notes = require('../db/db.json');

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // When a user visits a link, ex: localhost:PORT/api/admin... 
  // (they are shown a JSON of the data in the notes)
  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => {
    console.log('GET /api/notes called');
    console.log('req.body:\n', JSON.stringify(req.body, null, 2));
    return res.json(notes);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // When a user submits form data (a JSON object)
  // ...the JSON is pushed to the db.json array
  // (ex. User adds a note... this data is then sent to the server...
  // Then the server saves the data to the notesData-db.json file)
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {
    console.log('POST /api/notes called');
    console.log('req.body:\n', JSON.stringify(req.body, null, 2));
    res.send({ body: 'POST /api/notes response!!!' });
    /*
    const newNote = req.body;
  
    notes.push(newNote);
    res.json(newNote);
    // Note the code here. Our "server" will respond to requests and show users their saved notes.
    // It will do this by sending out the value "true" have a note
    // req.body is available since we're using the body parsing middleware
    if (notes.length > 0) {
      notes.push(req.body);
      res.json(true);
    } else {
      res.json(false);
    }
    */
  });

  function writeToFile(newNote, data) {
    fs.writeFile(newNote, data, err =>
      err ? console.error(err) : console.log(`Successfully created"${newNote}"`)
      );
  }

  // I added this below code so you could clear out the table while working with the functionality.

//   app.post('/api/clear', (req, res) => {
//     // Empty out the arrays of data
//     tableData.length = 0;
//     waitListData.length = 0;

//     res.json({ ok: true });
//   });
};
