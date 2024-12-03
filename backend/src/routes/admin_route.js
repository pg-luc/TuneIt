import { Router } from "express";
import { createSong } from "../controllers/admin_controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth_middleware.js";

const router = Router();

// route to the admin page with authentication
router.post("/songs", protectRoute, requireAdmin, createSong);

export default router;