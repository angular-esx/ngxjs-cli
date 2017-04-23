#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var path = require('path');
var generateGrid = require('./layouts/grid/grid.layout');

program
  .arguments('<cmd> <component>')
  .option('--main <main>', 'Generator main layout grid|tabbar|list|feed')
  .option('--rows [rows]', 'Rows number')
  .option('--cols [cols]', 'Cols number')
  .option('--fluid [fluid]', 'Use fluid')
  .option('--side-nav [side-nav]', 'Generator side-nav left or right | Default left')
  .option('--toolbar', 'Generator toolbar')
  .action(function (cmd, component) {

    let main = program.main;
    let sideNav = program.sideNav;
    let toolbar = program.toolbar;
    let rows = program.rows;
    let cols = program.cols;
    let fluid = program.fluid;

    if (cmd === 'g' || cmd === 'generate') {

      if (main != undefined) {
        if (main === 'grid') {
          generateGrid(component, rows, cols, sideNav, toolbar, fluid);
        } else if (main === 'tabbar') {
          console.log('In Process');
          // generateTabbar('tabbar', component, componentFile);
        } else if (main === 'list') {
          console.log('In Process');
          // generateList('list', component, componentFile);
        } else if (main === 'feed') {
          console.log('In Process');
          // generateFeed('feed', component, componentFile);
        }
      }
    }

    // console.log('cmd: %s; component: %s; main: %s; side-nav: %s; toolbar %s', cmd, component, program.main, program.sideNav, program.toolbar);
  })
  .parse(process.argv);
