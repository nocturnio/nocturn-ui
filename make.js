#!/usr/bin/env node

const fs = require("fs");
const currentDir = process.cwd();
const moduleDir = __dirname;
const [ ,, ... args ] = process.argv;
const project = require("./project.json");
const fileNames = project.files;
const testFileNames = project.tests;
const includeVersion = project.includeVersion;
const version = project.version;

var errorHandler = function (next, custom) {
    return (e, content) => {
        if (e) {
            if (custom) {
                custom(e);
            } else {
                console.log(e);
                console.log("Error: bundling nocturn-io failed");
            }
        } else {
            if (next) next(content);
        }
    };
};
var stopAfterCount = function (stop, func) {
    var count = 0;
    return () => {
        count++;
        if (count === stop) {
            func();
        }
    };
};
var help = function () {
    console.log("make file for bundling nocturn.io");
};
var writeFile = function (args) {
    var outputFile = args[0] || currentDir + "/nocturn-ui_" + version.split(".").join("-") + ".js";
    var includeTests = args[1] === "-t";
    var files = {};
    var names = fileNames.concat(includeTests ? testFileNames : []);
    var done = stopAfterCount(names.length, function () {
        var combinedFile = names.map(function (n) { return files[n]; }).join("");
        fs.writeFile(outputFile, combinedFile, errorHandler());
    });
    names.forEach(function (name) {
        fs.readFile(name, errorHandler(function (content) {
            files[name] = "" + content;
            done();
        }));
    });
};

// commands
var commands = {
    "-h": help,
    "-o": writeFile
};

// start
var command = args[0] || "-o";
var run = commands[command];
if (run) {
    run(args.slice(1));
} else {
    console.log("Error: no command found named " + command);
}
