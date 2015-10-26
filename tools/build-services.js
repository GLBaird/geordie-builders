var fs = require("fs");
var path = require("path");

var serviceTemplate = fs.readFileSync(__dirname+"/templates/src/js/services/service-template.js").toString('utf8');
var serviceTestTemplate = fs.readFileSync(__dirname+"/templates/tests/service-spec.js").toString('utf8');

function buildServices(services, factories, appname, outputpath) {

    var _serv = processService(services, path.join(outputpath, "src/js/services"), "service");
    var _fact = processService(factories, path.join(outputpath, "src/js/services"), "factory");

    var allServices = _serv.registry.concat(_fact.registry);
    var success = _serv.success && _fact.success;

    success = success && buildServiceRegistry(allServices, appname, outputpath);

    return success;

}

function buildServiceRegistry(services, appname, outputpath) {
    var registry = "//Registry for all services\n\nvar services = {\n\n";
    var success = true;

    for (var i in services) {
        if (services.hasOwnProperty(i)) {
            // register service
            var service = services[i];
            registry += "\t"+service.name+": require(\"./"+service.filename+"\")"
                + ( Number(i)+1 < services.length ? ",\n" : "\n" );

            // build unit test
            var serviceTestFile = serviceTestTemplate
                .replace(/\{\{appName}}/ig, appname)
                .replace(/\{\{service}}/ig, service.name);

            var serviceTestFilepath = path.join(outputpath, "tests/"+service.name+"_service-spec.js");
            console.log((" Writing.. "+serviceTestFilepath).yellow);
            fs.writeFileSync(serviceTestFilepath, serviceTestFile);
            success = success && fs.existsSync(serviceTestFilepath);
        }
    }

    registry += "\n\n};\n\nmodule.exports = services;";

    var registryPath = path.join(outputpath, "src/js/services/index.js");
    console.log((" Writing file.. "+registryPath).yellow);
    fs.writeFileSync(registryPath, registry);

    return success && fs.existsSync(registryPath);
}

function processService(services, outputpath, type) {
    var registry = [];
    var success = true;

    for (var i in services) {
        if (services.hasOwnProperty(i)) {
            var service = services[i];
            var serviceFile = serviceTemplate
                .replace(/\{\{serviceName}}/ig, service);
            var filename = service.toLowerCase()+"-"+type+".js";
            var outputfilePath = path.join(outputpath, filename);
            console.log((" Writing file.. "+outputfilePath).yellow);
            fs.writeFileSync(outputfilePath, serviceFile);
            registry.push({ name: service, filename: filename });
            success = success && fs.existsSync(outputfilePath);
        }
    }

    return { success: success, registry: registry };
}

module.exports = buildServices;