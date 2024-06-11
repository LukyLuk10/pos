import * as express from 'express';
import { pool } from "../config/db";
import { Food } from "../model/Owner";

export const foodRouter = express.Router();

// Get all foods
foodRouter.get('/', (req, res, next) => {
    const query = `SELECT * FROM food`;
    pool.query(query, (err, rows) => {
        if (err) {
            next(err);
            return;
        }
        let data: Food[] = [];
        rows.forEach((row: { id: number | undefined; name: string | undefined; calories: number | undefined; }) => {
            const food = new Food(row.id, row.name, row.calories);
            data.push(food);
        });
        res.status(200).json(data);
    });
});

// Get a single food by id
foodRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM food WHERE id = ?`;
    pool.query(query, [id], (err, rows) => {
        if (err) {
            next(err);
            return;
        }
        if (rows.length > 0) {
            const row = rows[0];
            const food = new Food(row.id, row.name, row.calories);
            res.status(200).json(food);
        } else {
            res.status(404).end();
        }
    });
});

// Create a new food
foodRouter.post('/', (req, res, next) => {
    const { name, calories } = req.body;
    const query = `INSERT INTO food (name, calories) VALUES (?, ?)`;
    pool.query(query, [name, calories], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        const insertedId = result.insertId;
        const newFood = new Food(insertedId, name, calories);
        res.status(200).json(newFood);
    });
});

// Update a food by id
foodRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const { name, calories } = req.body;
    const query = `UPDATE food SET name = ?, calories = ? WHERE id = ?`;
    pool.query(query, [name, calories, id], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        if (result.affectedRows > 0) {
            res.status(200).send("" + result.affectedRows);
        } else {
            res.status(404).send("" + 0);
        }
    });
});

// Delete a food by id
foodRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const query = `DELETE FROM food WHERE id = ?`;
    pool.query(query, [id], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        if (result.affectedRows > 0) {
            res.status(200).send("" + result.affectedRows);
        } else {
            res.status(404).send("" + 0);
        }
    });
});
