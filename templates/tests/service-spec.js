// TESTS for {{service}}

// load app and all frameworks with require
var app = require("../src/js/app");

// Define unit test for controller
describe("{{service}} Tests", function() {

    console.log("Testing {{service}}");

    // load app module through mocks
    beforeEach(angular.mock.module("{{appName}}"));

    var {{service}};

    // define $service by getting mocks to inject code into our variable
    beforeEach(inject(function(_{{service}}_) {
        {{service}} = _{{service}}_;
    }));

    // test service
    describe("A set of tests", function() {

        it("Should load the service", function(){
            expect({{service}}).toBeDefined();
        });

        it("Should perform some other test", function() {
            // test code
        });

        // write more tests

    });

});