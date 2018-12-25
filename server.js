var express = require('express'),
    app = express(),
    data = require("./api/data/data"),
    port = process.env.PORT || 3001,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./api/routes/routes'); //importing routes
routes(app); //register the route

app.listen(port);

// app.use(function (req, res) {
    // res.status(404).send({ url: req.originalUrl + ' not found' })
// });

console.log("RESTful API server started on: " + port);
