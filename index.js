#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var path = require('path');
var generateGrid = require('./layouts/grid/grid.layout');

const COMPONENT_FOLDER = 'components';

program
  .arguments('<cmd> <component>')
  .option('--main <main>', 'Generator main layout grid|tabbar|list|feed')
  .option('--rows [rows]', 'Rows number')
  .option('--cols [cols]', 'Cols number')
  .option('--side-nav [side-nav]', 'Generator side-nav left or right | Default left')
  .option('--toolbar', 'Generator toolbar')
  .action(function (cmd, component) {

    action(cmd, component, program.main, program.sideNav, program.toolbar, program.rows, program.cols);

    console.log('cmd: %s; component: %s; main: %s; side-nav: %s; toolbar %s', cmd, component, program.main, program.sideNav, program.toolbar);
  })
  .parse(process.argv);


function action(cmd, component, main, sideNav, toolbar, rows, cols) {
  if (cmd === 'g' || cmd === 'generate') {

    if (main != undefined) {
      if (main === 'grid') {
        generateGrid(component, rows, cols, sideNav, toolbar);
      } else if (main === 'tabbar') {
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
}

function readFiles(dirname, onError) {
  let files = {},
    content;

  let filenames = fs.readdirSync(dirname);

  filenames.forEach(function (filename) {
    files[filename] = fs.readFileSync(path.resolve(dirname, filename), 'utf-8');
  });

  return files;
}

function replacePath(fileName, componentRoot, componentFile) {
  return fileName.replace(componentRoot, componentFile);
}

function replaceContent(content, componentFile, componentName) {
  return content
    .replace(/{{componentFile}}/g, componentFile)
    .replace(/{{componentName}}/g, componentName);
}

function generateGrid(grid, component, componentFile) {
  const componentRoot = 'grid';

  let files = readFiles(path.resolve(__dirname, path.join(COMPONENT_FOLDER, componentRoot)));

  Object.keys(files).forEach(function (fileName) {

    let fileNameReplaced = replacePath(fileName, componentRoot, componentFile);

    let fileContentReplaced = replaceContent(files[fileName], componentFile, component);

    fs.writeFile(path.join(componentFile, fileNameReplaced), fileContentReplaced, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  })
}
