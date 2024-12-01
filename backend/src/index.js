import express from "express";
import dotenv from "dotenv";

// Routes imports
import users_route from "./routes/users_route.js";
import admin_route from "./routes/admin_route.js";
import auth_route from "./routes/auth_route.js";
import songs_route from "./routes/songs_route.js";
import albums_route from "./routes/albums_route.js";
import stats_route from "./routes/stats_route.js";

//Database import
import { connectDB } from "./lib/db.js";

// Middleware
dotenv.config();
const app = express();
const port = process.env.PORT;

// Routes setup
app.use("/api/users", users_route);
app.use("/api/admin", admin_route);
app.use("/api/auth", auth_route);
app.use("/api/songs", songs_route);
app.use("/api/albums", albums_route);
app.use("/api/stats", stats_route);

app.listen(port, () => {
    console.log(`Application is listening on PORT: ${port}`);
    connectDB();
})