import * as express from 'express';
import { pool } from "../config/db";
import { User } from "../model/Vehicle";
import { Food } from "../model/Owner";
import { DailyIntake } from "../model/Renter";

export const userRouter = express.Router();

userRouter.post('/login/', (req, res, next) => {
    const sql = `SELECT * FROM user WHERE username = ? AND password = SHA1(?)`;
    const values = [req.body.username, req.body.password];
    pool.query(sql, values, (err, rows) => {
        if (err) return next(err);
        if (rows.length > 0) {
            const userData = rows[0];
            const user = new User(userData.id, userData.name, userData.email, userData.height, userData.weight, userData.age);
            res.status(200).json(user);
        } else {
            res.status(404).end();
        }
    });
});

userRouter.post('/register/', (req, res, next) => {
    const sql = `INSERT INTO user (name, email, height, weight, age) VALUES (?, ?, ?, ?, ?)`;
    const values = [req.body.name, req.body.email, req.body.height, req.body.weight, req.body.age];
    pool.query(sql, values, (err, result) => {
        if (err) return next(err);
        const insertedId = result.insertId;
        pool.query(`SELECT * FROM user WHERE id = ?`, [insertedId], (err, rows) => {
            if (err) return next(err);
            if (rows.length > 0) {
                const newUser = rows[0];
                const user = new User(newUser.id, newUser.name, newUser.email, newUser.height, newUser.weight, newUser.age);
                res.status(200).json(user);
            } else {
                res.status(404).send(null);
            }
        });
    });
});

userRouter.put('/update/', (req, res, next) => {
    const sql = `UPDATE user SET name = ?, email = ?, height = ?, weight = ?, age = ? WHERE id = ?`;
    const values = [req.body.name, req.body.email, req.body.height, req.body.weight, req.body.age, req.body.id];
    pool.query(sql, values, (err) => {
        if (err) return next(err);
        res.status(200).send(null);
    });
});
