const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const getArea = (req, res) => {
    const key = req.params.key;
    pool.query("SELECT * FROM emissions WHERE key=$1 OR name=$1", [key], (error, results) => {
        if(error) {
            res.status(404).send({url: req.originalUrl + ' not found'});
        }
        res.status(200).json({ "results": results.rows });
    });
}

module.exports = {
    getArea
}