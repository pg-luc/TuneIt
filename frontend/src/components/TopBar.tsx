import { SignOutButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { useState } from 'react'
import { Link } from "react-router";
import { SignInOAuthButtons } from './SignInOAuthButtons';

export const TopBar = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div className='flex items-center justify-between sticky p-4 top-0 bg-zinc-900/75 backdrop-blur-md z-10'>

            <div className='flex items-center gap-2 size-10 text-indigo-400'>
                TuneIt
            </div>

            <div className='flex items-center gap-4'>
                {isAdmin && (
                    <Link to={"/admin"}>
                        <LayoutDashboardIcon className='size-4 mr-2' />
                        Admin Dashboard
                    </Link>
                )}
            </div>

            <SignedIn>
                <SignOutButton />
            </SignedIn>

            {/* If the user is signed out, see this button */}
            <SignedOut>
                <SignInOAuthButtons />
            </SignedOut>
        </div>
    )
}
