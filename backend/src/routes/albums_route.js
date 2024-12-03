import { Router } from "express";
import { getAlbumID, getAllAlbums } from "../controllers/album_controller";

const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumID", getAlbumID);

export default router;