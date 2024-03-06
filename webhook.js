const express = require('express');
const fs = require('fs/promises');
const multer = require('multer');
const path = require('path');

const app = express();

var upload = multer({dest: '/tmp/'});

app.post('/', upload.single('thumb'), async (request, response) => {
    const payload = JSON.parse(request.body.payload);
    console.log('Got webhook for', payload);

    const filePath = path.join(__dirname, 'payload.txt');

    await fs.appendFile(filePath, JSON.stringify(payload) + '\n');

    response.sendStatus(200);
});

app.get('/', async (request, response) => {
    const filePath = path.join(__dirname, 'payload.txt');
    const fileContent = await fs.readFile(filePath, 'utf8');

    const body = '<p><a href="/pretty">pretty</a></p><pre>' + fileContent + '</pre>'

    response.send(body);
});

app.get('/pretty', async (request, response) => {
    const filePath = path.join(__dirname, 'payload.txt');
    const fileContent = await fs.readFile(filePath, 'utf8');

    const formattedJsonLines = fileContent
        .trim()
        .split('\n')
        .map((line) => {
            return `<pre>${
                JSON.stringify(
                    JSON.parse(line),
                    null,
                    2
                )
            }</pre>`;
        });

    const body = '<p><a href="/">simple</a></p>' + formattedJsonLines.join('\n')

    response.send(body);
});

app.listen(10000);