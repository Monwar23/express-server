import { Router } from "express";
import { authControllers } from "./auth.conroller";

const router = Router()

router.post("/login", authControllers.loginUser)

export const authRoutes = router;