import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth_middleware.js";
import { getAllStats } from "../controllers/stats_controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllStats);

export default router;