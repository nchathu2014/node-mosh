const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');


const express = require('express');


const config = require('config');
const morgan = require('morgan')
const helmet = require("helmet");
const logger = require('./middleware/logging');
const auth = require('./middleware/auth');

const courses = require('./routes/courses');
const home = require('./routes/home');
const health = require('./routes/health');

const app = express();



//Set the view engin
app.set('view engine', 'pug');
app.set('views', './views'); // optional


// ENVIRONMENTS
startupDebugger('ENV: ', process.env.NODE_ENV);
startupDebugger('ENV: ', app.get('env'));

//Set the morgan middlware only to development ENV
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan Enabled...');
}

//DB work
dbDebugger('This is a database related thing');

//Routes
app.use('/', home);
app.use('/health', health);
app.use('/api/courses', courses);


//environment variables
const port = process.env.PORT || 3000;
app.listen(port, () => startupDebugger(`Listening...to port ${port}`));


