#! /usr/bin/env node

var shell = require("shelljs");
var path = require("path");

var configPath = path.join(__dirname, '..', 'lib','run.js');
shell.exec("casperjs test " + configPath);
