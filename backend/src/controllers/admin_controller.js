import { Song } from "../models/songs_model.js";
import { Album } from "../models/albums_model.js";
import { v2 as cloudinary } from 'cloudinary'

// Function to upload to Cloudinary
const cloudinaryUpload = async (file) => {
    try {
        // use cloudinary's uploader functions
        const result = await cloudinary.uploader.upload(file, {
            resource_type: "auto" // auto detects the file type
        })
        console.log(`Cloudinary upload result for: ${file}`, "\n", result);
        return result.secure_url;
    }
    catch (error) {
        // log errors if not successfully created
        console.log("Error in uploading to cloudinary: ", error);
        throw new Error("Error in uploading to cloudinary: ", error);
    }
}

// Function for when a song is uploaded 
export const createSong = async (req, res) => {
    try {
        // Check the req body if the file uploaded exists
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            res.status(400).json({ message: "Please upload all files" });
        }

        // If the file exists, then extract info from request body for database upload
        const { title, artist, duration, albumID } = req.body;
        // Then extract the audio and image files info
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        // Then upload to cloudinary 
        const audioURL = await cloudinaryUpload(audioFile);
        const imageURL = await cloudinaryUpload(imageFile);

        // Then create a new song object to be uploaded to the database
        const song = new Song({
            title,
            artist,
            imageURL,
            audioURL,
            duration,
            albumID: albumID || null
        });

        // In MongoDB, Saves this document by inserting a new document into the database
        await song.save();

        // If there is an albumID 
        try {
            if (albumID) {
                // find the album through the ID and update it
                await Album.findOneAndUpdate(albumID, {
                    $push: { songs: song._id }
                });
            }

            res.status(201).json({ message: `${song.title} has been created and added in ${albumID}` })
        }
        catch (error) {
            // log errors if not successfully added to album
            console.log("Failed! to upload song to album: ", error);
            res.status(500).json({ success: false, message: "Internal server error: ", error });
        }
    }
    catch (error) {
        // log errors if not successfully created
        console.log("Failed! to upload song file: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }
}

export const deleteSong = async (req, res) => {
    try {
        // Extract the song ID from req
        const { id } = req.params;

        // Get song details from database
        const song = await Song.findById(id);

        // Check to see if the song is tied to an album
        if (song.albumID) {
            // If there is an album ID go and update album 
            await Album.findByIdAndUpdate(song.albumID, {
                $pull: { Song: song._id },
            })
        }

        // Find the song id and delete from database
        await Song.findByIdAndDelete(id);

        res.status(200).json({ message: `${song.title} succesfully deleted` });

    }
    catch (error) {
        // log errors if not successfully deleted
        console.log("Failed! to delete song file: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }

}