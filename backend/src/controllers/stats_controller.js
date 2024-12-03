import { Song } from "../models/songs_model.js"
import { Album } from "../models/albums_model.js"
import { User } from "../models/users_model.js"

export const getAllStats = async (req, res) => {
    try {
        const [totalSongs, totalAlbums, totalUsers, totalArtist] = await Promise.all([
            // Use the countDocuments function to count how many objects are inside the database
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),

            // Use an aggregrate pipeline function to filter out the artists
            Song.aggregate([
                // combine the collection with Album
                {
                    $unionWith: { coll: "Album", pipeline: [] }
                },
                {
                    $group: { _id: "$artist" }
                },
                {
                    $count: "count"
                }
            ]),
        ]);

        console.log("Successfully fetched Stats");
        res.status(200).json({ success: true, message: "Successfully fetched Stats" });
    }
    catch (error) {
        // log errors if not successfully fetched
        console.log("Failed! to fetch Stats: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }

}