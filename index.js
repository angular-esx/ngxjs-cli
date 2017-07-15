#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var path = require('path');
var generate = require('./generators');

program
  .arguments('<cmd> <component>')
  .option('--config <path>', 'Config Path')
  .option('--output <path>', 'Output Path')
  .option('--main <main>', 'Generator main layout grid|tabbar|list|feed')
  .option('--rows [rows]', 'Rows number')
  .option('--cols [cols]', 'Cols number')
  .option('--fluid [fluid]', 'Use fluid')
  .option('--sidenav [sidenav]', 'Generator sidenav left or right | Default left')
  .option('--toolbar', 'Generator toolbar')
  .action(function (cmd, component) {

    var defaultConfig = getDefaultConfig();
    var outputPath = path.join(__dirname, program.output || '.');

    var config;

    if (program.config) {
      config = require(path.resolve(__dirname, path.resolve(__dirname, program.config)));
    }

    var options = {};

    if (config) {
      options = {
        main: {
          card: config.main && config.main.card,
          list: config.main && config.main.list,
        },
        toolbar: config.toolbar,
        tabbar: config.tabbar,
      }

      if (config.sidenav) {
        if (config.sidenav.left || config.sidenav.right) {
          options.sidenav = config.sidenav;
        } else {
          options.sidenav = defaultConfig.sidenav
        }
      }

      if (config.main.grid) {
        if (config.main.grid.rows || config.main.grid.cols) {
          options.main.grid = {
            rows: config.main && config.main.grid.rows || defaultConfig.main.grid.rows,
            cols: config.main && config.main.grid.cols || defaultConfig.main.grid.cols,
          }
        } else {
          options.main.grid = defaultConfig.main.grid;
        }
      }
    }

    generate(component, options, outputPath);
  })
  .parse(process.argv);


function getDefaultConfig() {
  return require(path.resolve(__dirname, path.resolve(__dirname, 'default-config.js')));
}
