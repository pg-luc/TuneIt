import { Router } from "express";
import { protectRoute } from "../middleware/auth_middleware.js";
import { getAllUsers } from "../controllers/user_controller.js";

const router = Router();

// Using the protectRoute to authenticate the user first
router.get("/", protectRoute, getAllUsers);

export default router;