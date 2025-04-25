const express = require('express');
const app = express();
const Game = require('./Game');
const port = 3500;
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.get("/", (req, res) => {
    res.send('app');

});
app.get("/game/start", async (req, res) => {
    const game = new Game.Game();
    res.json({ object: game });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});