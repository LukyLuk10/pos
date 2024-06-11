"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = __importStar(require("express"));
const db_1 = require("../config/db");
const User_1 = require("../model/User");
exports.userRouter = express.Router();
exports.userRouter.post('/login/', (req, res, next) => {
    const sql = `SELECT * FROM user WHERE username = ? AND password = SHA1(?)`;
    const values = [req.body.username, req.body.password];
    db_1.pool.query(sql, values, (err, rows) => {
        if (err)
            return next(err);
        if (rows.length > 0) {
            const userData = rows[0];
            const user = new User_1.User(userData.id, userData.name, userData.email, userData.height, userData.weight, userData.age);
            res.status(200).json(user);
        }
        else {
            res.status(404).end();
        }
    });
});
exports.userRouter.post('/register/', (req, res, next) => {
    const sql = `INSERT INTO user (name, email, height, weight, age) VALUES (?, ?, ?, ?, ?)`;
    const values = [req.body.name, req.body.email, req.body.height, req.body.weight, req.body.age];
    db_1.pool.query(sql, values, (err, result) => {
        if (err)
            return next(err);
        const insertedId = result.insertId;
        db_1.pool.query(`SELECT * FROM user WHERE id = ?`, [insertedId], (err, rows) => {
            if (err)
                return next(err);
            if (rows.length > 0) {
                const newUser = rows[0];
                const user = new User_1.User(newUser.id, newUser.name, newUser.email, newUser.height, newUser.weight, newUser.age);
                res.status(200).json(user);
            }
            else {
                res.status(404).send(null);
            }
        });
    });
});
exports.userRouter.put('/update/', (req, res, next) => {
    const sql = `UPDATE user SET name = ?, email = ?, height = ?, weight = ?, age = ? WHERE id = ?`;
    const values = [req.body.name, req.body.email, req.body.height, req.body.weight, req.body.age, req.body.id];
    db_1.pool.query(sql, values, (err) => {
        if (err)
            return next(err);
        res.status(200).send(null);
    });
});
