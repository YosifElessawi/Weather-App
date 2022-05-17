// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { process_params } = require('express/lib/router');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
//Callback
function listening() {
console.log(`Server running on localhost: ${port}...`);
};

// GET route
app.get('/all', sendData);

function sendData(request, response) {
    response.send(projectData);
    projectData.splice(0,projectData.length);
}

// POST route
app.post('/add', saveData);
function saveData(req, res) {
    console.log(req.body);
    projectData = req.body;
}
