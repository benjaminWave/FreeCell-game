const express = require('express');
const app = express();
const port = 5000;

const path = require('path');
const convertHandler = require(__dirname +'/scripts/convert.js');
app.use(express.static(path.join(__dirname)));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/scripts/SVGFile.html');
});
app.post('/convert', (req, res) => {
    const result = convertHandler.convert(req.body);
    res.json(result);
  });
