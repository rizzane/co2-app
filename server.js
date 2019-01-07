var express = require('express'),
    app = express(),
    data = require("./api/data/data"),
    port = process.env.PORT || 3001,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./api/routes/routes'); //importing routes
routes(app); //register the route

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}
app.listen(port);

console.log("RESTful API server started on: " + port);
