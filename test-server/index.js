const test = require('./test.json');
const test1 = require('./test1.json');
const express = require('express');
const json_xml = require('json_xml');
const cors = require('cors');
const app = express();

app.use(cors());

app.get("/application", function (request, response) {

    response.set({
        'Content-Type': 'application/json',
    })

    let region = request.query.district;

    console.log(region);

    if (region == 0) {
        response.send(test);
    }
    else {
        response.send(test1);
    }
    response.end();
});

app.get("/visualization", function (request, response) {

    response.set({
        'Content-Type': 'text/plain',
    })

    let region = request.query.district;

    console.log(region);

    if (region == 0) {
        response.send('/graph.png');
    }
    else {
        response.send('/img2.jpg');
    }
    response.end();
});

app.listen(8000, () => {
    console.log('listening to port 8000...');
});