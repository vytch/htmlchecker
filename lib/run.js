// Integration testing
// ===================

var _ = require('underscore');
var suite = require('../helpers/suite');
var fs = require('fs');

casper.on( 'remote.message', function ( msg ) {
    this.echo( 'remote.message' + msg );
} )

casper.on( 'error', function ( err ) {
    this.die( "PhantomJS has an error: " + err );
} );

casper.on( 'resource.error', function ( err ) {
    casper.log( 'Resource load error: ' + err, 'warning' );
} );

var isModulePresent = function(selector){
    return casper.exists(selector);
};

var getDefaultConfig = function() {

    try {
        require('HTMLCheck.js');
    } catch(e) {
        throw new Error('No configuration found');
    }
}


var config = (casper.cli.get('c'))?require(casper.cli.get('c')):getDefaultConfig();

locations = config.pages;

var forbiddenClasses = [];

_.each(locations, function(page){
    casper.test.begin( 'Testing NAB app ' + page.name, function ( test ) {
        
        // Opening the page
        // --------------------
        console.log('opening page ' + page.name );
        // --------------------
        
        casper.start( page.url);
        casper.then(function(){
            console.log(casper.page.injectJs("casper/libs/jquery.js"));
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