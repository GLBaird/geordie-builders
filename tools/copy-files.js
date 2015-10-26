var fs = require("fs");
var path = require("path");


// Code could do with optimising, as lots of repeated and redundant code!
// did not have time to sweep through and refactor it!
function copyFiles(output, settings) {
    var bootstrap = settings.bootstrap.toLowerCase().indexOf("y")>=0;
    var views = settings.views;
    var project = settings.nodeValues;
    var files = [
        "gulpfile.js",
        "karma.conf.js"
    ];

    var success = true;

    console.log("\n Copying Files".white);

    for (var i in files) {
        if (files.hasOwnProperty(i)) {
            var src = path.join( __dirname+"/../templates", files[i] );

            var dest = path.join( output, files[i] );

            console.log((" Writing file.. "+dest).yellow);
            fs.writeFileSync(dest, fs.readFileSync(src));
            success = success && fs.existsSync(dest);
        }
    }

    var bowerPath = bootstrap ? __dirname+"/../templates/bower-bootstrap.json" : __dirname+"/../templates/bower-nobootstrap.json";
    var bowerFile = fs.readFileSync(bowerPath).toString('utf8');

    bowerFile = bowerFile
        .replace("{{name}}", project.name)
        .replace("{{description}}", project.description)
        .replace("{{author}}", project.author)
        .replace("{{license}}", project.license)
        .replace("{{homepage}}", project.homepage);

    var bowerPathOut = path.join(output, "bower.json");
    fs.writeFileSync(bowerPathOut, bowerFile);
    success = success && fs.existsSync(bowerPathOut);

    // copy main CSS file
    var mainCSSFile = path.join(output, "src/css/01_main.css");
    fs.writeFileSync(mainCSSFile, fs.readFileSync(__dirname+"/../templates/src/css/01_main.css"));
    success = success && fs.existsSync(mainCSSFile);

    // load templates for view related copies
    var unitTemplate = fs.readFileSync(__dirname+"/../templates/tests/controller-spec.js").toString('utf8');
    var controllerTemplate = fs.readFileSync(__dirname+"/../templates/src/js/controllers/controller-template.js").toString('utf8');
    var viewTemplate = fs.readFileSync(__dirname+"/../templates/src/js/views/view-template.html").toString('utf8');
    var controllerRegistry = fs.readFileSync(__dirname+"/../templates/src/js/controllers/index.js").toString('utf8');
    var cRegister = "";
    var routers = fs.readFileSync(__dirname+"/../templates/src/js/routes/index.js").toString('utf8');
    var routeRegistry = "";
    var otherwise;

    // process views copy dependencies
    for(var v in views) {
        if(views.hasOwnProperty(v)) {
            var view = views[v];

            // copy view files
            var viewFileName = view.toLowerCase()+"_view.html";
            var viewFileContent = viewTemplate
                .replace(/\{\{view}}/g, view);
            var viewDest = path.join(output, "src/js/views/"+viewFileName);
            console.log((" Writing file.. "+viewDest).yellow);
            fs.writeFileSync(viewDest, viewFileContent);
            success = success && fs.existsSync(viewDest);

            // copy controller files
            var controller = controllerTemplate
                .replace(/\{\{view}}/g, view)
                .replace(/\{\{viewname}}/g, viewFileName)
                .replace(/\{\{viewcontroller}}/g, view+"Controller");
            var controllerDest = path.join(output, "src/js/controllers/"+view.toLowerCase()+"_controller.js");
            console.log((" Writing file.. "+controllerDest).yellow);
            fs.writeFileSync(controllerDest, controller);
            success = success && fs.existsSync(controllerDest);

            // copy unit test files
            var unitTest = unitTemplate
                .replace(/\{\{ViewName}}/g, view+"Controller")
                .replace(/\{\{AppName}}/g, project.name);
            var testDest = path.join(output, "tests/"+view.toLowerCase()+"_controller-spec.js");
            console.log((" Writing file.. "+testDest).yellow);
            fs.writeFileSync(testDest, unitTest);
            success = success && fs.existsSync(testDest);

            // build controller registry
            cRegister += "\n\t"+view+"Controller: require(\"./"+view.toLowerCase()+"_controller\")";
            if (v < views.length-1) cRegister+=",";


            // CSS File for View
            var cssContent = "\n."+view+" {\n\t/* Write Styles */\n}";
            var counter = Number(v)+2;
            counter = counter < 10 ? "0"+counter : counter;
            var cssDest = path.join(output, "src/css/"+counter+"_"+view+".css");
            console.log((" Writing file.. "+cssDest).yellow);
            fs.writeFileSync(cssDest, cssContent);
            success = success && fs.existsSync(cssDest);

            // update routes
            routeRegistry += "\t\t.when(\"/"+view.toLowerCase()+"\", {\n"+
                "\t\t\ttemplateUrl: \"js/views/"+viewFileName+"\",\n"+
                "\t\t\tcontroller: \""+view+"Controller\"\n\t\t})\n\n";
            if (!otherwise) otherwise = view.toLowerCase();

        }
    }

    // write controller registry
    controllerRegistry = controllerRegistry.replace("{{content}}", cRegister);
    var regpath = path.join(output, "src/js/controllers/index.js");
    console.log((" Writing file.. "+regpath).yellow);
    fs.writeFileSync(regpath, controllerRegistry);
    success = success && fs.existsSync(regpath);

    // router registry
    routeRegistry += "\t\t.otherwise({\n\t\t\tredirectTo: \"/"+otherwise+"\"\n\t\t})\n";
    routers = routers.replace("{{content}}", routeRegistry);
    var routerpath = path.join(output, "src/js/routes/index.js");
    console.log((" Writing file.. "+routerpath).yellow);
    fs.writeFileSync(routerpath, routers);
    success = success && fs.existsSync(routerpath);

    return success;
}

module.exports = copyFiles;