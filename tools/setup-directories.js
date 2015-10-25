var fs = require("fs");
var path = require("path");

function setupDirectories(dir, callback) {

    console.log(" Creating project structure...".white);

    var locations = [
        path.join(dir, "db"),
        path.join(dir, "server"),
        path.join(dir, "server/api"),
        path.join(dir, "server/models"),
        path.join(dir, "tests"),
        path.join(dir, "src"),
        path.join(dir, "src/css"),
        path.join(dir, "src/images"),
        path.join(dir, "src/js"),
        path.join(dir, "src/js/controllers"),
        path.join(dir, "src/js/routes"),
        path.join(dir, "src/js/services"),
        path.join(dir, "src/js/views")
    ];

    // filter locations to what does not exist
    var createList = locations.filter(function(location) {
        return !fs.existsSync(location);
    });

    // make directories
    for(var i in createList) {
        if (createList.hasOwnProperty(i)) {
            fs.mkdirSync(createList[i]);
        }
    }

    // test for success
    var success = true;

    // do all folders exist
    for(var j in locations) {
        if (locations.hasOwnProperty(j)) {
            success = success && fs.existsSync(locations[j]);
        }
    }

   callback(success);
}

module.exports = setupDirectories;