import { Song } from "../models/songs_model.js";

// Function to fetch a all songs for the Admin
export const getAllSongs = async (req, res) => {
    try {
        // Get all songs from the database
        // sort them by the field "createdAt" and in descending (-1)
        const songs = await Song.find().sort({ createdAt: -1 });

        console.log("Successfully fetched all songs");
        res.status(200).json({ message: "Successfully fetched all songs" });
    }
    catch (error) {
        // log errors if not successfully fetched
        console.log("Failed! to fetch al songs: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }
}

// Function to fetch a random 6 songs
export const getFeaturedSongs = async (req, res) => {
    try {
        // Using the aggregrate function to do multiple actions (pipeline and stages)
        const songs = await Song.aggregate([
            {
                $sample: { size: 6 }
            },
            {
                $project: {
                    title: 1,
                    artist: 1,
                    imageURL: 1,
                    audioURL: 1
                }
            }
        ]);

        console.log("Successfully fetched featured songs");
        res.status(200).json({ message: "Successfully fetched featured songs" });
    }
    catch (error) {
        // log errors if not successfully fetched
        console.log("Failed! to fetch featured songs: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }

}

export const getMadeForYouSongs = async (req, res) => {
    try {
        // Using the aggregrate function to do multiple actions (pipeline and stages)
        const songs = await Song.aggregate([
            {
                $sample: { size: 4 }
            },
            {
                $project: {
                    title: 1,
                    artist: 1,
                    imageURL: 1,
                    audioURL: 1
                }
            }
        ]);

        console.log("Successfully fetched made for you songs");
        res.status(200).json({ message: "Successfully fetched made for you songs" });
    }
    catch (error) {
        // log errors if not successfully fetched
        console.log("Failed! to fetch made for you songs: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }
}

export const getTrendingSongs = async (req, res) => {
    try {
        // Using the aggregrate function to do multiple actions (pipeline and stages)
        const songs = await Song.aggregate([
            {
                $sample: { size: 6 }
            },
            {
                $project: {
                    title: 1,
                    artist: 1,
                    imageURL: 1,
                    audioURL: 1
                }
            }
        ]);

        console.log("Successfully fetched trending songs");
        res.status(200).json({ message: "Successfully fetched trending songs" });
    }
    catch (error) {
        // log errors if not successfully fetched
        console.log("Failed! to fetch trending songs: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }
}
