const express = require('express');
const path = require('path');
//const cors = require('cors');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/capstone-spa'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.get('/*', function(req, res) {

    res.sendFile(path.join(__dirname + '/dist/capstone-spa/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);