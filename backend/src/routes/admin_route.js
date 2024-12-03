import { Router } from "express";
import { createSong, deleteSong } from "../controllers/admin_controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth_middleware.js";

const router = Router();

{/*
    protectRoute - For adding encryption/protection for when backend and database is communicating
    requireAdmin - Checks the user id if they are a registed admin or if they have the admin id
*/}

// Route for posting/creating and uploading a new song
router.post("/songs", protectRoute, requireAdmin, createSong);
// Route for deleting song
router.post("/songs/:id", protectRoute, requireAdmin, deleteSong);

// Route for posting/creating and uploading a new song
router.post("/albums", protectRoute, requireAdmin, createAlbum);
// Route for deleting song
router.post("/albums/:id", protectRoute, requireAdmin, deleteAlbum);

export default router;