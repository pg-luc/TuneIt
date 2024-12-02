import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("ALBUM PAGE");
});

export default router;