const express = require('express');
const app = express();
const data = require("./api/data");
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const path = require("path");

app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var routes = require('./api/routes/routes'); //importing routes
routes(app); //register the route


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
});

app.listen(port, () => console.log(`Listening on port ${port}`));
