import { User } from "../models/users_model.js";

// Function to fetch all users for the user
export const getAllUsers = async (req, res) => {
    try {
        // get the current users authenticated
        const currentUserID = req.auth.userId;

        // Get all the User objects in the database
        const users = await User.find({
            // pipeline and stage to omit the current user from the list using their clerkID
            clerkID: { $neq: currentUserID },
        });

        console.log("Successfully fetched all Users");
        res.status(200).json({ message: "Successfully fetched all Users" });
    }
    catch (error) {
        // log errors if not successfully fetched
        console.log("Failed! to fetch all Users: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }

}