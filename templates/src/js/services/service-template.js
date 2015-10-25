var {{serviceName}} = [
    "$http",
    function($http) {
        console.log("Service {{serviceName}} is running");

        function doSomething() {
            console.log("Doing something...");
        }

        // Expose public apis
        return {
            do: doSomething
        }
    }
];

module.exports = {{serviceName}};