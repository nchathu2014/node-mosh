const URL = 'http://my.logger/log';

function log(message) {
    //Call API
    console.log(message);
}

module.exports = log;


/**
 * console.log(module)
 *
 * Module {
  id: '.',
  exports: { log: [Function: log] },  <-----------------
  parent: null,
  filename: 'C:\\NUWAN\\Skills\\NodeJS\\node-mosh\\logger.js',
  loaded: false,
  children: [],
  paths:
   [ 'C:\\NUWAN\\Skills\\NodeJS\\node-mosh\\node_modules',
     'C:\\NUWAN\\Skills\\NodeJS\\node_modules',
     'C:\\NUWAN\\Skills\\node_modules',
     'C:\\NUWAN\\node_modules',
     'C:\\node_modules' ] }
 * **/