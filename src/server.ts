import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";


const app = express()
const port = config.port

// initializing DB
initDB()


app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});

app.use(express.json())
// app.use(express.urlencoded())


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

// users CRUD
app.use("/users", userRoutes);

app.use("/todos", todoRoutes);

app.use((req: Request, res: Response) => {
        res.status(404).json({
            success: false,
            message: "Route not found",
            data: req.path
        })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
