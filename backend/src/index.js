import express, { json } from "express";
import { clerkMiddleware } from '@clerk/express'
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

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json()); // Make express Parse json data
// checks the request's cookies and headers for a session JWT if found, attaches the Auth object to the request object under the auth key.
app.use(clerkMiddleware())

// Routes setup
app.use("/api/users", users_route);
app.use("/api/admin", admin_route);
app.use("/api/auth", auth_route);
app.use("/api/songs", songs_route);
app.use("/api/albums", albums_route);
app.use("/api/stats", stats_route);

// Connect to port and database
app.listen(port, () => {
    console.log(`Application is listening on PORT: ${port}`);
    connectDB();
}) 