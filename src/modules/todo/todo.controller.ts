import { Request, Response } from "express";
import { todoServices } from "./todo.service";

// todo

const createTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.createTodo(req.body);
        // console.log(result.rows[0]);
        res.status(201).json({
            success: true,
            message: "Todo inserted Successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

const getTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getTodo();

        res.status(200).json({
            success: true,
            message: "todos gets successfully",
            data: result.rows,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};

const getSingleTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getSingleTodo(req.params.id as string);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch todo" });
    }
};

const updateTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.updateTodo(req.body, req.params.id as string);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update todo" });
    }
}

const deleteTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.deleteTodo(req.params.id as string);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json({ success: true, message: "Todo deleted", data: null });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete todo" });
    }
}


export const todoControllers = {
    createTodo, getSingleTodo, getTodo, updateTodo, deleteTodo
}