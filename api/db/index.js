const { Pool } = require("pg");
const dotenv = require("dotenv");
const data = require("../data");

dotenv.config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

pool.on('connect', () => {
    console.log('connected to the db');
});


(async () => {
    const client = await pool.connect();
    try {
        const dropQuery = "DROP TABLE IF EXISTS emissions";
        var res = await client.query(dropQuery);
        const tableQuery =
            `CREATE TABLE IF NOT EXISTS
                emissions(
                key VARCHAR(100),
                name VARCHAR(100),
                year VARCHAR(4),
                value VARCHAR(100),
                population VARCHAR(100)
            )`;
        res = await client.query(tableQuery);

        const insertQuery = `INSERT INTO
            emissions(key, name, year, value, population)
            VALUES($1, $2, $3, $4, $5)
            returning *`;
        const countries = data.countryData;
        
       for(i in countries) {
           let row = countries[i];
            let values = [
                row["key"],
                row["name"],
                row["year"],
                row["value"],
                row["population"]
            ];
            res = await client.query(insertQuery, values);
        }
    } finally {
        client.release();
    }
})().catch(e => console.log(e.stack));

pool.on('remove', () => {
    console.log('Database initialized');
    process.exit(0);
});