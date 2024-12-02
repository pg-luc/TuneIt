import { Router } from "express";
import { getAdmin } from "../controllers/admin_controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth_middleware.js";

const router = Router();

// route to the admin page with authentication
router.get("/", protectRoute, requireAdmin, getAdmin);

export default router;