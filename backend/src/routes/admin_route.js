import { Router } from "express";
import { getAdmin, createSong } from "../controllers/admin_controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth_middleware.js";

const router = Router();

// route to the admin page with authentication
router.get("/", protectRoute, requireAdmin, getAdmin);

// route to the admin page with authentication
router.post("/", protectRoute, requireAdmin, createSong);

export default router;