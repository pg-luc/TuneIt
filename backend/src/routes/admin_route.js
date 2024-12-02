import { Router } from "express";
import { getMethod } from "../controllers/admin_controller.js";

const router = Router();

router.get("/", getMethod);

export default router;