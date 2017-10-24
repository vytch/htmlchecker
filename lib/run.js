// Integration testing
// ===================

var _ = require('underscore');
var fs = require('fs');
var check = require('../helpers/testHelpers');
var suite = require('../helpers/suite');

var isModulePresent = function(selector){
    return casper.exists(selector);
};

var getDefaultConfig = function() {
    try {
        return require(getProjectFilePath('htmlCheck.js'));
    } catch(e) {
        throw new Error('No configuration found');
    }
};

var getProjectFilePath = function(file) {
    return casper.cli.get('casper-path') + '/../../' + file;
}

var config = (casper.cli.get('c'))?require(getProjectFilePath(casper.cli.get('c'))):getDefaultConfig();

// Registering all the tests.
config.specs(suite, check);

var modulePath = casper.cli.get('path');
 
var locations = config.pages;

var forbiddenClasses = [];

casper.on( 'remote.message', function ( msg ) {
    this.echo( 'remote.message' + msg );
})

casper.on( 'error', function ( err ) {
    this.die( "PhantomJS has an error: " + err );
});

casper.on( 'resource.error', function ( err ) {
    casper.log( 'Resource load error: ' + err, 'warning' );
});

_.each(locations, function(page){
    casper.test.begin( 'Testing HTML for location: ' + page.name, function ( test ) {
        
        // Opening the page
        // --------------------
        console.log('opening page ' + page.name );
        // --------------------
        
        casper.start( page.url);
        casper.then(function(){
            console.log(casper.page.injectJs(modulePath + "/libs/jquery.js"));
        });

        // Setting up the tests
        // --------------------
        console.log('setting tests');
        // --------------------

        casper.then(function(){
            suite.execute(casper);
            
            // looping through all the forbidden classes
            _.each(forbiddenClasses, function(selector){
                casper.test.assert(
                    casper.exists(selector) === false, 
                    '"' + selector + '" should not be in ' + page.name
                  );
            })
        });
    
        // Running  the tests
        // --------------------
        console.log('running tests');
        // --------------------
        
        casper.run( function () {
            console.log( '\nTHE END.' );
            // phantomcss.getExitStatus() // pass or fail?
            casper.test.done();
        } );
    });
});