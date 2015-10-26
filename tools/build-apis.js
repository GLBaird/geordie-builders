var fs = require("fs");
var path = require("path");

var modelTemplate = fs.readFileSync(__dirname+"/templates/server/models/model-template.js").toString("utf8");
var apiTemplate = fs.readFileSync(__dirname+"/templates/server/api/api-template.js").toString("utf8");

function buildAPIs(apiList, output) {

    var success = true;

    var modelServices = apiList.map(function(value) {
        var values = value.split(":");
        return { model: values[0], service: values[1] };
    });

    var modelReg = "";
    var apiReg   = "";

    // write model and api files from tempaltes
    for (var i in modelServices) {
        if (modelServices.hasOwnProperty(i)) {

            var api = modelServices[i];

            var modelFile = modelTemplate
                .replace(/\{\{model}}/ig, api.model);

            var apiFile = apiTemplate
                .replace(/\{\{model}}/ig, api.model)
                .replace(/\{\{api}}/ig, api.service);

            var modelFilePath = path.join(output, "server/models/"+api.model+".js");
            var apiFilePath   = path.join(output, "server/api/"+api.service+".js");

            console.log((" Writing file.. "+modelFilePath).yellow);
            console.log((" Writing file.. "+apiFilePath).yellow);

            fs.writeFileSync(modelFilePath, modelFile);
            fs.writeFileSync(apiFilePath, apiFile);

            success = success && fs.existsSync(modelFilePath) && fs.existsSync(apiFilePath);

            // register apis and models
            apiReg   += "\t"+api.service+": require(\"./"+api.service+"\")";
            modelReg += "\t// "+api.model+" model\n\t"+api.model+": require(\"./"+api.model+"\")";

            if (Number(i)+1 < modelServices.length) {
                apiReg += ","; modelReg += ",";
            }
            apiReg += "\n\n"; modelReg += "\n\n";
        }
    }

    // write out registries
    var apiRegFile = "// API Route Registry\nvar api = {\n\n"
        +apiReg+"};\n\nmodule.exports = api;";

    var modelRegFile = "// Model Registry\nvar models = {\n\n"+
            modelReg+"};\n\nmodule.exports = models;"

    // make paths and write files
    var apiRegFilepath = path.join(output, "server/api/index.js");
    var modelRegFilepath = path.join(output, "server/models/index.js");

    console.log((" Write file.. "+apiRegFilepath).yellow);
    console.log((" Write file.. "+modelRegFilepath).yellow);

    fs.writeFileSync(apiRegFilepath, apiRegFile);
    fs.writeFileSync(modelRegFilepath, modelRegFile);

    // COPY Server.js File

    var serverJSFilePath = path.join(output, "server/server.js");
    var serverJS = fs.readFileSync(__dirname+"../templates/server/server.js").toString("utf8");

    console.log((" Write file.. "+serverJSFilePath).yellow);
    fs.writeFileSync(serverJSFilePath, serverJS);

    return success && fs.existsSync(apiRegFilepath)
        && fs.existsSync(modelRegFilepath)
        && fs.existsSync(serverJSFilePath);

}

module.exports = buildAPIs;