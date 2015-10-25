var fs = require("fs");
var path = require("path");

function makeAngularBootStrap(settings, output) {

    var bootFile = "// Angular Appliation Bootstrap File\n" +
        "// "+settings.nodeValues.name+"\n\n"+
        "var controllers = require(\"./controllers\");\n\n"+
        "// Define Angular Module\n"+
        "var app = angular\n"+
        "\t.module(\""+settings.nodeValues.name+"\", [\"ngRoute\"])\n\n"+
        "\t// Load Factories\n"+
        processServices(settings.factories, "-factory")+
        "\n\t// Load Services\n"+
        processServices(settings.services, "-service")+
        "\n\t// Load Controllers\n"+
        loadControllers(settings.views)+
        "\n\t// Load API Models and Routes\n"+
        "\t.config([\"$routeProvider\", require(\"./routes\")]);"+
        "\n\nmodule.exports = app;";

    var bootFilePath = path.join(output, "src/js/app.js");
    console.log((" Writing to file.. "+bootFilePath).yellow);
    fs.writeFileSync(bootFilePath, bootFile);

    return fs.existsSync(bootFilePath);
}

function processServices(services, postfix) {
    var servicesReg = "";

    for (var i in services) {
        if (services.hasOwnProperty(i)) {
            var service = services[i];
            servicesReg += "\t.factory( \""+service+"\", require(\"./services/"+service+postfix+"\") )\n";
        }
    }

    return servicesReg;
}

function loadControllers(controllers) {
    var controllersReg = "";

    for (var i in controllers) {
        if (controllers.hasOwnProperty(i)) {
            var controller = controllers[i];
            controllersReg += "\t.controller( \""+controller+"Controller\", controllers."+controller+"Controller.controller )\n";
        }
    }

    return controllersReg;
}

module.exports = makeAngularBootStrap;