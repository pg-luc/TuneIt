import { Album } from "../models/albums_model.js";

export const getAllAlbums = async (req, res) => {
    try {
        // Use the .find function to get all the Album objects in the database
        const albums = await Album.find();

        console.log("Successfully fetched all albums");
        res.status(200).json({ message: "Successfully fetched all albums" });
    }
    catch (error) {
        // log errors if not successfully fetched
        console.log("Failed! to fetch albums: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }

}

export const getAlbumID = async (req, res) => {
    try {
        // Extract ID from request params
        const { id } = req.params;

        // check to see if there is an ID passed in the request
        if (!id) {
            console.log("No valid Album ID found");
            return res.status(400).json({ message: "No valid Album ID found" });
        }

        // Find the album using the ID in the database and fetch all the songs with that album ID
        // The populate function goes to the Song objects and finds the album ID
        const album = await Album.findById(id).populate("Song");

        // check if the album exists
        if (!album) {
            console.log("Album was not found");
            return res.status(404).json({ message: "Album was not found" });
        }

        console.log(`Successfully fetched ${album.title}`);
        res.status(200).json({ message: `Successfully fetched ${album.title}` });
    }
    catch (error) {
        // log errors if not successfully fetched
        console.log("Failed! to fetch album by ID: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }
}