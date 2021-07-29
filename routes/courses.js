const express = require('express');
const router = express.Router();

const _ = require('underscore');
const Joi = require('joi');

router.use(express.json());

let courses = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' },
    { id: 4, name: 'Course 4' },
];


router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const courseId = req.params.id;
    const course = _.find(courses, function (course) {
        return course.id === parseInt(courseId)
    })

    if (!course) return res.status(404).send('Course Not Found :(');
    res.send(course);
});

router.post('/', (req, res) => {


    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    courses.push(course);
    res.send(course);

});


router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const courseId = req.params.id;
    const course = _.find(courses, function (course) {
        return course.id === parseInt(courseId)
    })

    if (!course) return res.status(404).send('Course Not Found :(');
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course)

})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;