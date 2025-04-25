const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('src'));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/ui/Page.html');
});
