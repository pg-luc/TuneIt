import { Button } from "./ui/button.tsx";
import { useSignIn } from "@clerk/clerk-react";

export const SignInOAuthButtons = () => {
    const { signIn, isLoaded } = useSignIn();

    const signInWithGoogle = () => {
        signIn?.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback"
        });
    }

    {/* When clers is not loaded properly, return nothing */ }
    if (!isLoaded) {
        return null;
    }


    return (
        <Button onClick={signInWithGoogle} variant={"secondary"}>
            Continue with google
        </Button>
    )
};

