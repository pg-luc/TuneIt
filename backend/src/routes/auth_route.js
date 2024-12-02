import { Router } from "express";
import { authCallback } from "../controllers/auth_controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("AUTH PAGE");
})

// create a user
router.post("/callback", authCallback);

export default router;