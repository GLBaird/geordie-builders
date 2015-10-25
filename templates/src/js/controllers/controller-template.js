var {{viewcontroller}} = {

    name: "{{viewcontroller}}",
    html: "js/views/{{viewname}}",
    controller: [
        "$scope", "$http",
        function ($scope, $http) {
            console.log("{{view}} is Running!");
        }
    ]

};

module.exports = {{viewcontroller}};