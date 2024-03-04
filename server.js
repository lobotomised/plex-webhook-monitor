const express = require('express');
const fs = require('fs/promises');
const multer = require('multer');
const path = require('path');

const app = express();

var upload = multer({ dest: '/tmp/' });

app.get('/', (request, response) => {
    console.log('get request')

    response.sendStatus(200)
});

app.post('/', upload.single('thumb'), async (request, response) => {
    const payload = JSON.parse(request.body.payload);
    console.log('Got webhook for', payload);


    const currentDirectory = __dirname;
    const filePath = path.join(currentDirectory, 'payload.txt');

    await fs.appendFile(filePath, JSON.stringify(payload) + '\n');

    response.sendStatus(200);
});

app.listen(10000);

