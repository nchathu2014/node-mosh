const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello World!!!.....</h1>');
});

//Route parameters
app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3, 100, 1000]);
});

app.get('/api/courses/:id', (req, res) => {
    const id = req.params.id;
    res.send(id);
});

app.get('/api/courses/:id/price/:price', (req, res) => {
    const id = req.params.id;
    const price = req.params.price;
    res.send({ id, price });
});

//query parameters
app.get('/api/customers/:id', (req, res) => {
    const queryParam = req.query;
    res.send(queryParam);
});


//environment variables
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening... to port ${port}`));
