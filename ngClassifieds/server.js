/*
 * server.js
 *
 * Purpose: static web server to play with an Angular front end
*/

// ================================== SETUP ===================================
var express = require('express'),
    morgan = require('morgan'),
    path = require('path'),
    app = express(),
    port = process.env.PORT || 3000;


// ============================== CONFIGURATION ===============================
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));


// ================================ API ROUTES ================================


// ============================ APPLICATION ROUTES ============================
app.get('*', function (req, res) {
    // serve the view - Angular handes front-end
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


// =============================== START SERVER ===============================
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});