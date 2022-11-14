const express = require("express");
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/ishowo-frontend'));

app.get("/*" , function(req, res){
    res.sendFile(path.join(__dirname + '/dist/ishowo-frontend/index.html'))
});

app.listen(process.env.PORT);