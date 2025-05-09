const express = require('express');
const sharp = require('sharp');
const app = express();
const port = 5000;
const path = require('path');
/*app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});*/

const fs = require('fs');
app.use(express.json());

app.post('/convert', async (req, res) => {
    try {
        const svgString = req.body.svg;
        const fileName = req.body.name;
        const outputPath = path.join(__dirname, '..','/imgs/cards', fileName);
        await sharp(Buffer.from(svgString))
            .png()
            .toFile(outputPath);
            //res.set("Content-Type", "application/octet-stream");
            //res.set("Content-Disposition", "attachment; filename=output.png");
           // res.sendFile(outputPath);
        res.send('Image converted and saved');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error converting image');
    }
});

app.use(express.static(path.join(__dirname)));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/scripts/SVGFile.html');
});