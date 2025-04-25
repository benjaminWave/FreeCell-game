const express = require('express');
const app = express();
const Game = require('./Game');
const port=3500;

  app.get("/", (req, res) => {
    res.send('app');

 });
 app.get("/game/start", (req, res) => {
    const game = new Game.Game();

 });
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});