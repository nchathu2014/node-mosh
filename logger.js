const EventEmitter = require('events');
const URL = 'http://my.logger/log';

class Logger extends EventEmitter {

    log(message) {
        //Call API
        console.log(message);
        this.emit('messageLogged', { id: 100, url: URL })
    }
}

module.exports = Logger;
