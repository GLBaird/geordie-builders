var fs = require("fs");
var path = require("path");

function buildIndex(appname, views, bootstrap, output) {

    var viewList = "";
    for(var i in views) {
        if (views.hasOwnProperty(i)) {
            var view = views[i];
            viewList += "\t\t<a href='#/"+view.toLowerCase()+"'>"+view+"</a>\n";
        }
    }

    var templatePath = bootstrap
        ? "./templates/src/index-bootstrap.html"
        : "./templates/src/index.html";

    var template = fs.readFileSync(templatePath).toString("utf8");

    var indexFile = template
        .replace(/\{\{appname}}/ig, appname)
        .replace(/\{\{viewlinks}}/ig, viewList);


    var indexFilepath = path.join(output, "src/index.html");
    console.log((" Writing file.. "+indexFilepath).yellow);
    fs.writeFileSync(indexFilepath, indexFile);

    return fs.existsSync(indexFilepath);

}

module.exports = buildIndex;