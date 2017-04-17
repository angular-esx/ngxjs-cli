var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var generate = require('../../utils/generate');

function generateGrid(component, rows, cols, toolbar, sidenav) {
  if (!rows) rows = 2;
  if (!cols) cols = 2;

  let componentFileName = _.kebabCase(component);

  if (!fs.existsSync(componentFileName)) {
    fs.mkdirSync(componentFileName);
    fs.mkdirSync(path.join(componentFileName, 'styles'));
    fs.mkdirSync(path.join(componentFileName, 'templates'));
    fs.mkdirSync(path.join(componentFileName, 'routes'));
  } else {
    console.log('Folder is exists!');

    process.exit();
  }

  let files = readFiles(path.resolve(__dirname, path.join('..', 'base')));

  Object.keys(files).forEach(function (fileName) {
    let baseComponentFile = replacePath(fileName, componentFileName);

    let fileContentReplaced = replaceContent(files[fileName], component, componentFileName);

    fs.writeFile(path.join(componentFileName, baseComponentFile), fileContentReplaced, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  })

  var source = fs.readFileSync(path.resolve(__dirname, 'grid.layout.html'), 'utf-8');

  var context = {
    rows: rows,
    cols: cols,
    toolbar: toolbar,
    sidenav: sidenav
  };

  var html = generate(source, context);

  fs.writeFile(path.join(componentFileName, 'templates', componentFileName + '.component.html'), html, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

function readFiles(dirname) {
  let files = {};

  let filenames = fs.readdirSync(dirname);

  filenames.forEach(function (filename) {
    let pathFile = path.resolve(dirname, filename);

    if (!fs.lstatSync(pathFile).isDirectory()) {
      files[filename] = fs.readFileSync(pathFile, 'utf-8');
    } else {
      let filesInDirectory = readFiles(pathFile);
      Object.keys(filesInDirectory).map(function (file) {
        var newFile = path.join(filename, file);
        files[newFile] = filesInDirectory[file]
      })
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