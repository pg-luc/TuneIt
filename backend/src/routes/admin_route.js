import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("ADMIN PAGE");
})

export default router;