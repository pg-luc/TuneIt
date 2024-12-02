import { clerkClient } from "@clerk/express";

// Function to check if the user is an aunthenticated and registered user
export const protectRoute = async (req, res, next) => {
    // check the request body if there is a authentication and user id to see if the user is a valid/registered user
    if (!req.auth.userId) {
        res.status(401).Json({ message: "Unauthorized user!" });
        return; // Terminates the session
    }

    // if the user is authenticated moved to the next function/step
    next();
};

// Function to check if the authenticated user from the ABOVE function ^ is an admin
export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId); // Get the user id from clerk
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress; // check to see if it is the Admin email

        // checks to see if admin is true or false
        if (!isAdmin) {
            res.status(403).Json({ message: "Unauthorized admin user!" });
            return; // Terminates the session
        }

        // if the user is an Admin moved to the next function/step
        next();
    }
    catch (error) {
        console.log("Error in admin check: ", error);
        res.status(500).Json({ message: "Internal server error: ", error });
    }
}