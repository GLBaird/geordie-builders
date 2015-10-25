// Imports
var express    = require("express");
var mongoose   = require("mongoose");
var bodyParser = require("body-parser");
var routes     = require("./api");

// connect to MongoDB
// Connect to MongoDB
mongoose.connect('mongodb://localhost/demo');
mongoose.connection.once('open', function() {

    var app = express();

    app.models = require("./models");

    // Static Routes
    app.use(express.static("./dist"));
    app.use("/bower", express.static("./bower_components"));

    // API Routes
    // Cross Origin Support (for Public APIs)
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin',  '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json());

    // Load in routes from registry
    for (var route in routes) {
        if (routes.hasOwnProperty(route)) {
            app.use("/"+route, routes[route](app));
        }
    }

    // 404 Fallback
    app.use("*", function(req, res) {
        res.status(404).send("<h1>Server Error 404</h1><p>File not found!</p>");
    });

    app.listen(3000, function() {
        console.log("Server running on port http:localhost:3000");
    });

});