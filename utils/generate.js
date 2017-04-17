var Handlebars = require('handlebars');

var timesHelper = require('./times');

Handlebars.registerHelper('times', timesHelper);

function generate(source, context) {
  var template = Handlebars.compile(source);
  return template(context).trim();
}

module.exports = generate;
