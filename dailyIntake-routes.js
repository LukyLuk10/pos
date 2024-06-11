"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyIntakeRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../config/db"); // Import the pool object
const DailyIntake_1 = require("../model/Renter");
exports.dailyIntakeRouter = express_1.default.Router();
// Rest of the code remains the same...
// Get all daily intake entries
exports.dailyIntakeRouter.get('/', (req, res, next) => {
    const query = `SELECT * FROM daily_intake`;
    db_1.pool.query(query, (err, rows) => {
        if (err) {
            next(err);
            return;
        }
        let data = [];
        rows.forEach((row) => {
            const intake = new DailyIntake_1.DailyIntake(row.id, row.userId, row.foodId, row.quantity, row.date);
            data.push(intake);
        });
        res.status(200).json(data);
    });
});
// Get a single daily intake entry by id
exports.dailyIntakeRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM daily_intake WHERE id = ?`;
    db_1.pool.query(query, [id], (err, rows) => {
        if (err) {
            next(err);
            return;
        }
        if (rows.length > 0) {
            const row = rows[0];
            const intake = new DailyIntake_1.DailyIntake(row.id, row.userId, row.foodId, row.quantity, row.date);
            res.status(200).json(intake);
        }
        else {
            res.status(404).end();
        }
    });
});
// Create a new daily intake entry
exports.dailyIntakeRouter.post('/', (req, res, next) => {
    const { userId, foodId, quantity, date } = req.body;
    const query = `INSERT INTO daily_intake (userId, foodId, quantity, date) VALUES (?, ?, ?, ?)`;
    db_1.pool.query(query, [userId, foodId, quantity, date], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        const insertedId = result.insertId;
        const newIntake = new DailyIntake_1.DailyIntake(insertedId, userId, foodId, quantity, date);
        res.status(200).json(newIntake);
    });
});
// Update a daily intake entry by id
exports.dailyIntakeRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const { userId, foodId, quantity, date } = req.body;
    const query = `UPDATE daily_intake SET userId = ?, foodId = ?, quantity = ?, date = ? WHERE id = ?`;
    db_1.pool.query(query, [userId, foodId, quantity, date, id], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        if (result.affectedRows > 0) {
            res.status(200).send("" + result.affectedRows);
        }
        else {
            res.status(404).send("" + 0);
        }
    });
});
// Delete a daily intake entry by id
exports.dailyIntakeRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const query = `DELETE FROM daily_intake WHERE id = ?`;
    db_1.pool.query(query, [id], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        if (result.affectedRows > 0) {
            res.status(200).send("" + result.affectedRows);
        }
        else {
            res.status(404).send("" + 0);
        }
    });
});
