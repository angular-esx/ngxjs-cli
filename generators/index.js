var grid = require('./grid');

module.exports = function (name, options, outputPath) {

  if (options.main !== undefined) {

    const main = options.main;

    if (main == 'grid' || main.grid) {
      grid(name, options, outputPath);
    } else if (main === 'tabbar') {
    //   console.log('In Process');
      // generateTabbar('tabbar', component, componentFile);
    } else if (main === 'list') {
    //   console.log('In Process');
      // generateList('list', component, componentFile);
    } else if (main === 'feed') {
    //   console.log('In Process');
    //   // generateFeed('feed', component, componentFile);
    }
  }



}
