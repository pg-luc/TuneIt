import { Router } from "express";
import { getAlbumID, getAllAlbums } from "../controllers/albums_controller.js";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumID", getAlbumID);

export default router;