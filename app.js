const EventEmitter = require('events');


const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (args) => {
    console.log(args);
})


logger.log('Nuwan');