import express from 'express';
import { pool } from "../config/db"; // Import the pool object
import { DailyIntake } from "../model/Renter";

export const dailyIntakeRouter = express.Router();

// Rest of the code remains the same...


// Get all daily intake entries
dailyIntakeRouter.get('/', (req, res, next) => {
    const query = `SELECT * FROM daily_intake`;
    pool.query(query, (err, rows) => {
        if (err) {
            next(err);
            return;
        }
        let data: DailyIntake[] = [];
        rows.forEach((row: { id: number | undefined; userId: number | undefined; foodId: number | undefined; quantity: number | undefined; date: string | undefined; }) => {
            const intake = new DailyIntake(row.id, row.userId, row.foodId, row.quantity, row.date);
            data.push(intake);
        });
        res.status(200).json(data);
    });
});

// Get a single daily intake entry by id
dailyIntakeRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM daily_intake WHERE id = ?`;
    pool.query(query, [id], (err, rows) => {
        if (err) {
            next(err);
            return;
        }
        if (rows.length > 0) {
            const row = rows[0];
            const intake = new DailyIntake(row.id, row.userId, row.foodId, row.quantity, row.date);
            res.status(200).json(intake);
        } else {
            res.status(404).end();
        }
    });
});

// Create a new daily intake entry
dailyIntakeRouter.post('/', (req, res, next) => {
    const { userId, foodId, quantity, date } = req.body;
    const query = `INSERT INTO daily_intake (userId, foodId, quantity, date) VALUES (?, ?, ?, ?)`;
    pool.query(query, [userId, foodId, quantity, date], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        const insertedId = result.insertId;
        const newIntake = new DailyIntake(insertedId, userId, foodId, quantity, date);
        res.status(200).json(newIntake);
    });
});

// Update a daily intake entry by id
dailyIntakeRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const { userId, foodId, quantity, date } = req.body;
    const query = `UPDATE daily_intake SET userId = ?, foodId = ?, quantity = ?, date = ? WHERE id = ?`;
    pool.query(query, [userId, foodId, quantity, date, id], (err, result) => {
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

// Delete a daily intake entry by id
dailyIntakeRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const query = `DELETE FROM daily_intake WHERE id = ?`;
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
