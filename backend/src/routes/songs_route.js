import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/songs_controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth_middleware.js";

const router = Router();

// set that only admin can get all songs
router.get("/", protectRoute, requireAdmin, getAllSongs);

// For all users to see, see a featured songs
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);


export default router;