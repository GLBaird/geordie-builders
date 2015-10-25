
var controllers = require("./controllers");

var app = angular
    .module("DemoApp", ["ngRoute"])

    // services
    .factory("DemoService", require("./services/demo"))

    // load controllers
    .controller(controllers.View1Controller.name, controllers.View1Controller.controller)
    .controller(controllers.View2Controller.name, controllers.View2Controller.controller)

    // load routes
    .config(["$routeProvider", require("./routes")]);

module.exports = app;