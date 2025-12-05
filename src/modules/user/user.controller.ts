import { Request, Response } from "express";
import { userServices } from "./user.service";

// user
const createUser = async (req: Request, res: Response) => {
    const { name, role, email, password } = req.body;

    try {
        const result = await userServices.createUser(req.body)
        // console.log(result.rows[0]);
        res.status(201).json({
            success: true,
            message: "Data inserted Successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUser();
        res.status(200).json({
            success: true,
            message: "users read Successfully",
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
}

const getSingleUser =  async (req: Request, res: Response) => {
    try {
        const result = await userServices.getSingleUser(req.params.id as string);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "users not found",
            })
        } else {
            res.status(200).json({
                success: true,
                message: "users fetch Successfully",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
}

const updateUser =  async (req: Request, res: Response) => {
    const {name, email}= req.body
    try {
        const result = await userServices.updateUser(name, email, req.params.id as string);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "users not found",
            })
        } else {
            res.status(200).json({
                success: true,
                message: "users updated Successfully",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.deleteUser(req.params.id as string);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "users not found",
            })
        } else {
            res.status(200).json({
                success: true,
                message: "users deleted Successfully",
                data: null
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
}


export const userControllers = {
    createUser, getUser, getSingleUser, updateUser, deleteUser
}