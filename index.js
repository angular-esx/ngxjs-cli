#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var path = require('path');

const COMPONENT_FOLDER = 'components';

program
  .arguments('<cmd> <component>')
  .option('--main <grid|tabbar|list|feed>', 'Generator main layout')
  .option('--sidemenu <sidemenu>', 'Generator sidemeu left or right | Default left')
  .option('--toolbar', 'Generator toolbar')
  .action(function (cmd, component) {

    action(cmd, component, program.main, program.sidemenu, program.toolbar);

    console.log('cmd: %s; component: %s; main: %s; sidemenu: %s; toolbar %s', cmd, component, program.main, program.sidemenu, program.toolbar);
  })
  .parse(process.argv);


function action(cmd, component, main, sidemenu, toolbar) {
  if (cmd === 'g' || cmd === 'generate') {

    const componentFile = component.toLowerCase();

    if (!fs.existsSync(componentFile)) {
      fs.mkdirSync(componentFile);
    } else {

      console.log('Folder is exists!');

      process.exit();
    }

    if (main != undefined) {
      if (main === 'grid') {
        generateGrid('grid', component, componentFile);
      } else if (main === 'tabbar') {
        generateTabbar('tabbar', component, componentFile);
      } else if (main === 'list') {
        console.log('In Process');
        // generateList('list', component, componentFile);
      } else if (main === 'feed') {
        console.log('In Process');
        // generateFeed('feed', component, componentFile);
      }
    }

    if (sidemenu !== undefined) {
      generateSidemenu(sidemenu, component, componentFile);
    }

    if (toolbar !== undefined) {
      generateToolbar(toolbar, component, componentFile);
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

function generateTabbar(tabbar, component, componentFile) {
  const componentRoot = 'tabbar';

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

function generateSidemenu(toolbar, component, componentFile) {
  const componentRoot = 'toolbar';

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

function generateToolbar(sidemenu, component, componentFile) {
  sidemenu = sidemenu || 'left';

  const componentRoot = 'toolbar';

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

