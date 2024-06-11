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
exports.foodRouter = void 0;
const express = __importStar(require("express"));
const db_1 = require("../config/db");
const Food_1 = require("../model/Owner");
exports.foodRouter = express.Router();
// Get all foods
exports.foodRouter.get('/', (req, res, next) => {
    const query = `SELECT * FROM food`;
    db_1.pool.query(query, (err, rows) => {
        if (err) {
            next(err);
            return;
        }
        let data = [];
        rows.forEach((row) => {
            const food = new Food_1.Food(row.id, row.name, row.calories);
            data.push(food);
        });
        res.status(200).json(data);
    });
});
// Get a single food by id
exports.foodRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const query = `SELECT * FROM food WHERE id = ?`;
    db_1.pool.query(query, [id], (err, rows) => {
        if (err) {
            next(err);
            return;
        }
        if (rows.length > 0) {
            const row = rows[0];
            const food = new Food_1.Food(row.id, row.name, row.calories);
            res.status(200).json(food);
        }
        else {
            res.status(404).end();
        }
    });
});
// Create a new food
exports.foodRouter.post('/', (req, res, next) => {
    const { name, calories } = req.body;
    const query = `INSERT INTO food (name, calories) VALUES (?, ?)`;
    db_1.pool.query(query, [name, calories], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        const insertedId = result.insertId;
        const newFood = new Food_1.Food(insertedId, name, calories);
        res.status(200).json(newFood);
    });
});
// Update a food by id
exports.foodRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const { name, calories } = req.body;
    const query = `UPDATE food SET name = ?, calories = ? WHERE id = ?`;
    db_1.pool.query(query, [name, calories, id], (err, result) => {
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
// Delete a food by id
exports.foodRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const query = `DELETE FROM food WHERE id = ?`;
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
