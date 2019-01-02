const { Pool } = require("pg");
const dotenv = require("dotenv");
const data = require("../data/data");

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the db');
});

(async () => {
    const client = await pool.connect();
    try {
        const dropQuery = "DROP TABLE IF EXISTS emissions";;
        const res1 = await client.query(dropQuery);
        const tableQuery =
            `CREATE TABLE IF NOT EXISTS
                emissions(
                key VARCHAR(100),
                name VARCHAR(100),
                type VARCHAR(100),
                year VARCHAR(4),
                value VARCHAR(100)
            )`;
        const insertQuery = `INSERT INTO
            emissions(key, name, type, year, value)
            VALUES($1, $2, $3, $4, $5)
            returning *`;
        const jsonCo2 = data.co2Json;
        const jsonPop = data.popJson;
        const res = await client.query(tableQuery);

        for (i in jsonCo2) {
            let json = jsonCo2[i]["field"];
            // let value = (json[3]["#text"] == null) ? 0 : json[3]["#text"];
            if (json[3]["#text"] != null) {
                let values = [
                    json[0]["attr"]["@_key"].toLowerCase(),
                    json[0]["#text"].toLowerCase(),
                    json[1]["#text"],
                    json[2]["#text"],
                    json[3]["#text"]
                ];
                const res = await client.query(insertQuery, values);
            }
        }

        for (i in jsonPop) {
            let json = jsonPop[i]["field"];
            let value = (json[3]["#text"] == null) ? 0 : json[3]["#text"];
            let values = [
                json[0]["attr"]["@_key"].toLowerCase(),
                json[0]["#text"].toLowerCase(),
                json[1]["#text"],
                parseInt(json[2]["#text"]),
                parseInt(value)
            ];
            const res = await client.query(insertQuery, values);
        }
    } finally {
        client.release();
    }
})().catch(e => console.log(e.stack));

pool.on('remove', () => {
    console.log('Database initialized');
    process.exit(0);
});