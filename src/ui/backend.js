const express = require('express');
const app = express();
const Game = require('./Game');
const port = 3500;
var game;
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
    game = new Game.Game()
    res.json({ object: game });
});
app.get("/game/checkSelect", async (req, res) => {
    res.json({ object: game.isCascade(req.body.card, req.body.posX,req.body.posY, req.body.section) });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});