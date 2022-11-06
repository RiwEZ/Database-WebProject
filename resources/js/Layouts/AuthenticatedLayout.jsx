import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Navbar from '@/Components/Navbar';
import { Link } from '@inertiajs/inertia-react';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>
            <div className="min-h-screen bg-white">
                <div className="max-w-6xl m-auto">
                    <Navbar auth={auth} showCart={false} />
                </div>
                <div className='h-full'>{children}</div>
            </div>
        </>
    );
}
