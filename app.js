const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.use(express.static(path.join(__dirname)));
//app.use(express.static('src'));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/page.html');
});
