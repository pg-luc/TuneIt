import { useUser } from '@clerk/clerk-react';

function AuthCallbackPage() {
    const { user } = useUser();
    return (
        <div>
            <h1>Auth Callback Page</h1>
            <h2>Hello {user?.fullName},{user?.id}</h2>
        </div>
    )
}

export default AuthCallbackPage
