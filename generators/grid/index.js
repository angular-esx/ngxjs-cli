var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var generate = require('../../utils/generate');

function generateGrid(component, parameters, outputPath) {

  var grid = parameters.main.grid;
  var cols = grid && grid.cols;
  var rows = grid && grid.rows;

  var toolbar = parameters.toolbar;
  var sidenav = parameters.sidenav;

  var componentFileName = _.kebabCase(component);

  if (!fs.existsSync(componentFileName)) {
    fs.mkdirSync(path.join(outputPath, componentFileName));
    fs.mkdirSync(path.join(outputPath, componentFileName, 'styles'));
    fs.mkdirSync(path.join(outputPath, componentFileName, 'templates'));
    fs.mkdirSync(path.join(outputPath, componentFileName, 'routes'));
  } else {
    console.log('Folder is exists!');

    process.exit();
  }

  var files = readFiles(path.resolve(__dirname, path.join('..', '..', 'layouts', 'base')));

  Object.keys(files).forEach(function (fileName) {
    var baseComponentFile = replacePath(fileName, componentFileName);

    var fileContentReplaced = replaceContent(files[fileName], component, componentFileName);

    fs.writeFile(path.join(outputPath, componentFileName, baseComponentFile), fileContentReplaced, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });

  generateTemplate(componentFileName, rows, cols, toolbar, sidenav, outputPath);

  generateStyle(componentFileName, toolbar, sidenav, outputPath);
}

function generateTemplate(componentFileName, rows, cols, toolbar, sidenav, outputPath) {

  var gridPath = path.join('..', '..', 'layouts', 'grid');

  var sourceHTML = fs.readFileSync(path.resolve(__dirname, path.join(gridPath, 'grid.layout.html')), 'utf-8');

  var context = {
    rows: rows,
    cols: cols,
    toolbar: toolbar,
    sidenav: sidenav
  };

  var html = generate(sourceHTML, context);

  fs.writeFile(path.join(outputPath, componentFileName, 'templates', componentFileName + '.component.html'), html, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

function generateStyle(componentFileName, toolbar, sidenav, outputPath) {
  var gridPath = path.join('..', '..', 'layouts', 'grid');

  var sourceSCSS = fs.readFileSync(path.resolve(__dirname, path.join(gridPath, 'styles', 'grid.component.scss')), 'utf-8');

  var context = {
    toolbar: toolbar,
    sidenav: sidenav,
    baseComponentFile: componentFileName
  };

  var scss = generate(sourceSCSS, context);

  fs.writeFile(path.join(outputPath, componentFileName, 'styles', componentFileName + '.component.scss'), scss, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

function readFiles(dirname) {
  var files = {};

  var filenames = fs.readdirSync(dirname);

  filenames.forEach(function (filename) {
    var pathFile = path.resolve(dirname, filename);

    if (!fs.lstatSync(pathFile).isDirectory()) {
      files[filename] = fs.readFileSync(pathFile, 'utf-8');
    } else {
      var filesInDirectory = readFiles(pathFile);
      Object.keys(filesInDirectory).map(function (file) {
        files[path.join(filename, file)] = filesInDirectory[file];
      });
    }
  });

  return files;
}

function replacePath(fileName, componentFile) {
  return fileName.replace('base', componentFile);
}

function replaceContent(content, componentName, componentFile, moduleName) {
  return content
    .replace(/{{baseComponent}}/g, componentName)
    .replace(/{{baseComponentFile}}/g, componentFile)
    .replace(/{{baseModule}}/g, componentName + 'Module');
}

module.exports = generateGrid;
