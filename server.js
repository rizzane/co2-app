var express = require('express'),
    app = express(),
    data = require("./api/data/data"),
    port = process.env.PORT || 3001,
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var routes = require('./api/routes/routes'); //importing routes
routes(app); //register the route

// if (process.env.NODE_ENV === "production") {
    app.use(‘/’, express.static(`${__dirname}/client/public`));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/public", "index.html"));
    });
// }
app.listen(port, () => console.log("Listening on port ${port}"));
