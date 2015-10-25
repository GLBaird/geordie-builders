// Schema for questions

var p = /^[A-Za-z0-9_-]+$/;
var m = " names can only be alpha numeric with no spaces";

var schema = {
    properties: {
        nodeValues: {
            properties: {
                name: {
                    description: " Project details:\n".white + " application name: ".green,
                    required: true,
                    pattern: p,
                    message: m
                },
                version: {
                    description: " version: ".green,
                    required: true,
                    default: "1.0.0"
                }
                ,
                author: {
                    description: " author: ".green,
                    required: false
                }
                ,
                description: {
                    description: " description: ".green,
                    required: false
                }
                ,
                keywords: {
                    description: " keywords: ".green,
                    required: false
                }
                ,
                homepage: {
                    description: " repository url: ".green,
                    required: false
                }
                ,
                license: {
                    description: " license: ".green,
                    default: "MIT"
                }
            }
        },
        bootstrap: {
            name: " bootstrap",
            message: "\n Application detials:".white + "\n Would you like to use bootstrap3? ".green,
            validator: /y[es]*|n[o]?/,
            warning: " Must respond yes or no",
            default: "yes"
        }
    }
};

module.exports = schema;