var _ = require('underscore');

var suite = function(){
    var testCases = [];

    // Registers a testcase
    var add = function (selector, testCase) {
        testCases.push({
            selector:selector,
            testCase:testCase
        });
    };

    // Executes all the registered testcases
    var execute = function(casper){
        _.each(testCases, function(testCase, index){
            if(casper.exists(testCase.selector)){
                testCase.testCase(testCase.selector);
            } 
        });
    };

    return {
        add:add,
        execute:execute
    }
};

module.exports = suite();
