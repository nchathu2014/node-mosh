const EventEmitter = require('events');

//EventEmitter is a class and, we have to create an instance of that class to use it

const eventEmitter = new EventEmitter();

eventEmitter.on('messageLogged', function () {
    console.log('Listener called');
})



eventEmitter.emit('messageLogged');

//=================================================



eventEmitter.on('logging', (args) => console.log(args.message))
eventEmitter.emit('logging', { message: 'This is the emit message' });
