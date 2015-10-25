var fs = require("fs");
var path = require("path");

var template = {
    "main": "./server/server.js",
    "scripts": {
        "db": "echo \"Running MongoDB\" && mongod --dbpath ./db",
        "start": "node ./server/server.js",
        "test": "karma start"
    },
    "dependencies": {
        "body-parser": "^1.14.1",
        "express": "^4.13.3",
        "mongoose": "^4.2.2",
        "node-restful": "^0.2.2"
    },
    "devDependencies": {
        "brfs": "^1.4.1",
        "browserify": "^11.2.0",
        "browserify-shim": "^3.8.10",
        "del": "^2.0.2",
        "gulp": "^3.9.0",
        "gulp-concat": "^2.6.0",
        "gulp-filesize": "0.0.6",
        "gulp-minify-css": "^1.2.1",
        "gulp-replace": "^0.5.4",
        "gulp-uglify": "^1.4.2",
        "karma": "^0.13.11",
        "karma-browserify": "^4.4.0",
        "karma-jasmine": "*",
        "karma-phantomjs-launcher": "^0.2.1",
        "vinyl-buffer": "^1.0.0",
        "vinyl-source-stream": "^1.1.0"
    },
    "browserify-shim": {
        "external": "global:External"
    }
};

function makeData(values, fpath) {
    var output = {};

    for(var prop in values) {
        if (values.hasOwnProperty(prop)) {
            var value = values[prop];
            if (typeof value != "undefined" && value != null && value != "") {
                if (prop == "keywords") {
                    output.keywords = value.split(",").map(function(val) {
                        return val.trim();
                    });
                } else {
                    output[prop] = value;
                }
            }
        }
    }

    for (var props in template) {
        if (template.hasOwnProperty(props)) {
            output[props] = template[props];
        }
    }

    var fp = path.join(fpath, "package.json");

    fs.writeFile(fp, JSON.stringify(output, null, '\t'), function(err) {
        if (err) {
            console.log("File Error - cannot write package.json".red);
            console.log(err);
        } else {
            var value = fp+" complete.";
            console.log(value.yellow);
        }
    });
}

module.exports = makeData;