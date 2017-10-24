#! /usr/bin/env node

var shell = require("shelljs");
var path = require("path");
var argv = require('minimist')(process.argv.slice(2));
// config

var cmdArray = [];

var modulepath = path.join(__dirname, '..', 'lib');
var configPath = path.join(modulepath,'run.js');

// Building the command line based on what areguments we have.
cmdArray.push("casperjs test");
cmdArray.push(configPath);
cmdArray.push("--path=" + modulepath);

// If we find any config paramater, we port it to the casperjs command.
if(typeof argv['config'] != 'undefined'){
    cmdArray.push("--c=" + argv['config']);
} else {
    console.dir(argv);
}

shell.exec(cmdArray.join(' '));
