import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("SONGS PAGE");
})

export default router;