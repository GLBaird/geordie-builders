/**
 * Mongoose Schema - {{model}}
 * MODEL Class
 *
 */
var schema = require("mongoose").Schema;

var {{model}} = new schema({
    prop1:   { type: String, required: true },
    prop2:   { type: String, required: true }
});

module.exports = {{model}};