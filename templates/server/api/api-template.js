// setup API router
var restful = require("node-restful");


function {{model}}APIRoute(app) {

    // setup restful
    var rest = restful
        .model("{{model}}", app.models.{{model}})
        .methods(["get", "put", "post", "delete"]);

    // register route and app with restful service
    rest.register(app, "/{{api}}");

    // return the middleware
    return function(req, res, next) {
        next();
    };

}

module.exports = {{model}}APIRoute;


