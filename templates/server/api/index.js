// API Route Registry
var routes = {

    // route for Person.js Restful Api access
    persons: require("./person"),

    // route for Company.js Restful Api access
    companies: require("./company")

};

module.exports = routes;