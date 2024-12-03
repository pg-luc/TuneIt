import express, { json } from "express";
import fileUpload from "express-fileupload";
import { clerkMiddleware } from '@clerk/express'
import dotenv from "dotenv";
import path, { dirname } from "path"; // this is a nodeJS module

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
const __dirname = path.resolve(); // makes the current working directory the ABSOLUTE path

app.use(express.json()); // Make express Parse json data

// checks the request's cookies and headers for a session JWT if found, attaches the Auth object to the request object under the auth key.
app.use(clerkMiddleware());

// ExpressJS middleware for uploading files.
app.use(fileUpload({
    useTempFiles: true, // stores images in a temporary files rather than storing it in the RAM
    tempFileDir: path.join(__dirname, "/tmp"),
    createParentPath: true, // creates the directory path specified
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to only 10mb with image size of 1024 x 1024
}));

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