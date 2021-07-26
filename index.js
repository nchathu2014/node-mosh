const express = require('express');
const _ = require('underscore');
const Joi = require('joi');

const app = express();
app.use(express.json())

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

    if (!course) res.status(404).send('Course Not Found :(');

    res.send(course);
});

app.post('/api/courses', (req, res) => {



    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    const { error } = validateCourse(course);
    if (!error) {
        //Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    const courseId = req.params.id;
    const courseName = req.body.name;

    const course = _.find(courses, function (course) {
        return course.id === parseInt(courseId)
    })

    const { error } = validateCourse(course);

    if (!course) res.status(404).send('Course Not Found :(');
    if (!error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = courseName;
    res.send(course);

})


//environment variables
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening...to port ${port}`));


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(course, schema);

    return result;
}