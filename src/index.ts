import express from "express";
import pool from "./database/db_connect_pg.js";
import type { QueryResult } from "pg";
import { dbconnection } from "./database/db_connect_mongo.js";

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        const query: QueryResult = await pool.query("SELECT * FROM empleados;");
        res.status(200);
        res.send(query.rows);
    } catch (error) {
        res.status(500);
        console.error(error);
    }
});

app.get('/mongo', (req, res) => {
    const response = dbconnection('sample_mflix','movies');
    res.send(response);
});

app.listen(port, () => {
    return console.log(`Estoy corriendo en el puerto ${port}`);
});

