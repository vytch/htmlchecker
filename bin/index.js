#! /usr/bin/env node

var shell = require("shelljs");
var path = require("path");

var configPath = path.join(__dirname, '..', 'casper','integration.js');
shell.exec("casperjs test " + configPath);
