module.exports = (app) => {
    const queries = require("./queries");
    
    app.get("/api/:key", queries.getArea);
    app.get("/api/countries/:key", queries.getSuggestions);
    
    app.use((req, res) => {
        res.status(404).send({ url: req.originalUrl + ' not found' })
    });
}