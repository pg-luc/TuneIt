import { Song } from "../models/songs_model.js";
import { Album } from "../models/albums_model.js";
import { v2 as cloudinary } from 'cloudinary'

// Function to check if you are an admin
export const checkAdmin = async (req, res) => {
    res.status(200).json({ admin: true });
}

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
// Function for when a song is deleted
export const deleteSong = async (req, res) => {
    try {
        // Extract the song ID from req
        const { id } = req.params;

        // If the song id is not provided
        if (!id) {
            return res.status(400).json({ message: "Please provide a valid Song id" });
        }

        // Get song details from database
        const song = await Song.findById(id);

        //

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

// Function for when an album is created
export const createAlbum = async (req, res) => {
    try {
        // Extract album info from the request body
        const { title, artist, releaseYear } = req.body;

        // Extract the image from the request body
        const imageFile = req.files.imageFile;

        // Then upload to cloudinary 
        const imageURL = await cloudinaryUpload(imageFile);

        // then created an album object to be uploaded to the database
        const album = new Album({
            title,
            artist,
            imageURL,
            releaseYear
        });

        // Save new album into database
        await album.save();

        res.status(201).json({ message: `${album.title} has been created` })
    }
    catch (error) {
        // log errors if not successfully deleted
        console.log("Failed! to create album: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }

}

// Function for when an album is deleted
export const deleteAlbum = async (req, res) => {
    try {
        // Get the album id
        const { id } = req.params;

        // If the album id is not provided
        if (!id) {
            return res.status(400).json({ message: "Please provide a valid Album id" });
        }

        // Go through all the Song documents in the collection and delete anything with the album ID
        await Song.deleteMany({ "albumID": id });

        // then delete the album itself
        await Album.findByIdAndDelete(id);

        res.status(200).json({ message: `${Album._id.title} succesfully deleted` });
    }
    catch (error) {
        // log errors if not successfully deleted
        console.log("Failed! to delete album: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }
}