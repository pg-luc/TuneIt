import { User } from "../models/users_model.js"

export const authCallback = async (req, res) => {
    try {
        // extract data from request body
        const { id, firstName, lastName, imageUrl } = req.body;

        // check if the user id already exists
        const user = await User.findOne({ clerkID: id });

        // if the user var above returns empty / user does not exist
        if (!user) {
            // sign and fill up user details
            User.create({
                clerkID: id,
                fullName: `${firstName} ${lastName}`,
                imageURL: imageUrl
            });
        }

        // if successfully created
        res.status(200).json({ success: true, message: `User: ${id} - ${firstName} ${lastName} has been created` });
        console.log(`Success! User: ${id} - ${firstName} ${lastName} has been created`);
    }
    catch (error) {
        // log errors if not successfully created
        console.log("Failed! in creating user: ", error);
        res.status(500).json({ success: false, message: "Internal server error: ", error });
    }
}