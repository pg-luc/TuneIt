import { LayoutDashboardIcon } from 'lucide-react';
import { useState } from 'react'
import { Link } from "react-router";

export const TopBar = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div className='flex bg-zinc-800 items-center justify-between p-4' >
            <div className='size-10 text-indigo-400'>
                TuneIt
            </div>

            {!isAdmin && (
                <Link to={"/admin"}>
                    <LayoutDashboardIcon className='size-6 mr-2' />
                    Admin Dashboard
                </Link>
            )}
        </div>
    )
}
