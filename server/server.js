const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");

app.use(cors());

PORT = 3030;

app.get("/games/:id", (req, res)=>{
    id = req.params.id;
    console.log(id);
    gameJSON = fs.readFileSync("./data/games.json")
    parsedGames = JSON.parse(gameJSON);
    console.log(parsedGames);

    let desiredGame = parsedGames.gameData.filter(obj => {
         return obj.id === id
    })

    console.log(desiredGame[0]);

    desiredGame = desiredGame[0];

    res.send(desiredGame);
})


app.get("/games/:id", (req, res)=>{

})

app.listen(PORT, console.log("listening"));