import express from "express";
import dotenv from "dotenv";

// Routes
import users_route from "./routes/users.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use("/api/users", users_route);

app.listen(port, () => {
    console.log(`Application is listening on PORT: ${port}`);
})