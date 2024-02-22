const express = require('express');
const fs = require('fs/promises');
const multer = require('multer');

const app = express();
const upload = multer({dest: '/tmp/'});

app.post('/', upload.single('thumb'), async (request, response) => {
    const payload = JSON.parse(request.body.payload);

    await fs.appendFile('payload.txt', JSON.stringify(payload + '\n'));

    response.sendStatus(200);
});

app.listen(10000)

