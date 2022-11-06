import React, { useState } from 'react';
import Navbar from '@/Components/nav/Navbar';

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
