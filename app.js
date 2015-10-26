#!/usr/bin/env node

// load color manager
var colors    = require('colors');

// clear screen and show greetings
process.stdout.write('\033c');
require("./tools/greeting")();

// check process arguments for a help flag
var help = process.argv.filter(function (arg) {
    // check for possibilities
    return arg.match(/([-]{0,2}help)|([-]{1,2}h)/i);
});

if(help.length > 0) {
    console.log(
        " Help and Information\n".green+
        "   This app will build a MEAN Application template based on mata-data.\n".white +
        "   You need a list of models, views, services and factories and it will\n".white +
        "   build the app with relevant unit tests, models and controller files built.\n".white +
        "   You can also ask for the bootstrap CSS to be loaded (CSS Only) onto your \n   project template.\n\n".white +
        " Commands:\n\n".green+
        "   help -help --help -h --h  ".yellow+
            "Prints this help file to the terminal.\n\n".white+
        "   -o <<filepath>>           ".yellow+
            "Chooses the output path of the built project. \n".white+
        "                             Will build to the current folder if no output flag is given\n\n".white
    );
    process.exit();
}

// extract runtime arguments from process (argv)
var argv      = require('minimist')(process.argv.slice(2));

// import frameworks
var prompt    = require('prompt');
var fs        = require('fs');
var path      = require('path');

// data gathering tools
var schema    = require('./tools/schema');
var getData   = require('./tools/get-data');

// project setup tools
var nodeB     = require("./tools/node-builder");
var setupDir  = require("./tools/setup-directories");
var copyFiles = require("./tools/copy-files");

// build tools
var sb        = require("./tools/build-services");
var apiB      = require("./tools/build-apis");
var indexB    = require("./tools/build-index");
var bs        = require("./tools/build-bootstrap");

// set output directory to runtime argument geordiebuilders -o <<path>>
var outputpath = argv.o || __dirname;

// setup prompt
prompt.message = "";
prompt.delimiter = "";
prompt.start();

// make store
var settings;

console.log(" NOTE: names must not have any spaces or special characters!\n".dim);


function stage1(err, result) {
    settings = result;

    // get models
    console.log("\n Server API Models\n".white +
        " Enter names of server side models / API Routes\n".green +
        " Enter as: ModelName:CollectionName,\n\tie. Person:people\n".green +
        " Enter blank entry to stop.".green);

    getData(prompt, " model-name: ".green, stage2);
}

function stage2(models) {
    settings.models = models;

    // get view controllers
    console.log("\n Views and Controllers\n".white +
        " Enter names of views - ".green +
        " will make accompanying controllers and unit tests.\n".green +
        " Enter blank entry to stop.".green);

    getData(prompt, " view: ".green, stage3);

}

function stage3(views) {
    settings.views = views;

    // get factories
    console.log("\n Services - singletons\n".white +
        " Enter names of factories - ".green +
        " will make accompanying unit tests.\n".green +
        " Enter blank entry to stop.".green);

    getData(prompt, " factory: ".green, stage4);
}

function stage4(factories) {
    settings.factories = factories;

    // get services
    console.log("\n Services\n".white +
        " Enter names of services - ".green +
        " will make accompanying unit tests.\n".green +
        " Enter blank entry to stop.".green);

    getData(prompt, " service: ".green, stage5);
}

function stage5(services) {
    settings.services = services;

    console.log("\n\n Building project...\n".white);

    outputpath = path.join(outputpath, settings.nodeValues.name);

    if (!fs.existsSync(outputpath)) {
        console.log(" Creating output dir: " + outputpath+"\n");
        fs.mkdir(outputpath, function (err) {
            if(err) {
                console.log(" Error creating directory for project!".red);
                console.log(err);
            } else {
                console.log(" Folder created.".yellow);
                build();
            }
        });
    } else {
        build();
    }
}

function build() {
    nodeB(settings.nodeValues, outputpath);
    setupDir(outputpath, function(success) {
        if (success) {
            console.log(" Project directories creates.".yellow);

            // Copy files and create Views, Controllers and Routes
            success = success && copyFiles(outputpath, settings);

            // make Services and Factories
            success = success && sb(settings.services, settings.factories, settings.nodeValues.name, outputpath);

            // make API Routes and Model
            success = success && apiB(settings.models, outputpath);

            // make src/index.html
            success = success && indexB(settings.nodeValues.name,settings.views, settings.bootstrap.indexOf("y")>=0, outputpath);

            // bootstrap all files into app.js
            success = success && bs(settings, outputpath);

            // check all files created good
            if (success) {
                console.log("\n\n Project successfully created.\n\n".white);
            } else {
                console.log("\n\n Errors in creating project!!!\n\n".red);
            }

        } else {
            console.log(" Error! Can't create folder structure!".red);
        }
    });
}

// get project settings from schema
prompt.get(schema, stage1);
