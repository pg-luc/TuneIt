import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Loader } from "lucide-react";

export const Auth_Provider = ({ children }: { children: React.ReactNode }) => {
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true);


    // Function to create a default header for the Authorization attribute with the auth token from clerk
    const updateApiToken = (token: string | null) => {
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        else {
            delete axiosInstance.defaults.headers.common['Authorization'];
        }

    }

    // Keeps track of the getToken function everytime is called and produces a result
    useEffect(() => {
        // function to initialise the authentication and get auth token
        const initAuth = async () => {
            try {
                // Get the token from clerk
                const token = await getToken();
                // Pass the token to the update token function
                updateApiToken(token);
            }
            catch (error) {
                updateApiToken(null); // pass a null value to the token to show that the user is not authenticated
                console.log("Error in Authentication Initiliazation: ", error);
            }
            finally {
                setLoading(false);
            }
        }

        // Call the Authentication Initiliazation
        initAuth();

    }, [getToken])

    // Create a nice looking UI for when loading is true
    if (loading === true) {
        return (
            <div className="h-screen w-full items-center justify-center" >
                <Loader className="size-10 text-indigo-500 animate-spin" />
            </div>
        )

    }

    return (
        <div>
            {children}
        </div>
    )

}

