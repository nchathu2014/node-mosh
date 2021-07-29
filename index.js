const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');


const express = require('express');
const _ = require('underscore');
const Joi = require('joi');

const config = require('config');
const morgan = require('morgan')
const helmet = require("helmet");
const logger = require('./middlewares/logging');
const auth = require('./middlewares/auth');

const app = express();

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

let courses = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' },
    { id: 4, name: 'Course 4' },
];

app.get('/health', (req, res) => {
    res.send('Ok');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const courseId = req.params.id;
    const course = _.find(courses, function (course) {
        return course.id === parseInt(courseId)
    })

    if (!course) return res.status(404).send('Course Not Found :(');
    res.send(course);
});

app.post('/api/courses', (req, res) => {


    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    courses.push(course);
    res.send(course);

});


app.put('/api/courses/:id', (req, res) => {
    const courseId = req.params.id;
    const courseName = req.body.name;

    const course = _.find(courses, function (course) {
        return course.id === parseInt(courseId)
    })

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    if (!course) return res.status(404).send('Course Not Found :(');

    course.name = courseName;
    res.send(course);

})

app.delete('/api/courses/:id', (req, res) => {
    const courseId = req.params.id;
    const course = _.find(courses, function (course) {
        return course.id === parseInt(courseId)
    })

    if (!course) return res.status(404).send('Course Not Found :(');
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course)

})

//environment variables
const port = process.env.PORT || 3000;
app.listen(port, () => startupDebugger(`Listening...to port ${port}`));


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}