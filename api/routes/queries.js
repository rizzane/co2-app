const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Query for getting the country data
const getArea = (req, res) => {
    const key = req.params.key;
    pool.query("SELECT * FROM emissions WHERE name=$1", [key], (error, results) => {
        if (error) {
            res.status(404).send({url: req.originalUrl + ' not found'});
        }
        res.status(200).json({ "results": results.rows });
    });
}

// Query for getting suggestions for input field
const getSuggestions = (req, res) => {
    const key = req.params.key + "%";
    pool.query("SELECT DISTINCT name FROM emissions WHERE name LIKE $1 ORDER BY name", [key], (error, results) => {
        if (error) {
            res.status(404).send({url: req.originalUrl + ' not found'});
        }
        res.status(200).json({ 
            "results": results.rows.map(r => {return r })
        });
    });
};

module.exports = {
    getArea,
    getSuggestions
}