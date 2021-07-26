const express = require('express');
const _ = require('underscore');
const app = express();

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


//environment variables
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening...to port ${port}`));
