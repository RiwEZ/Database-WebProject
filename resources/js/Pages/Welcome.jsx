import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import SearchBar from '@/Components/SearchBar';
import ProductViewer from '@/Components/ProductViewer';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen ">
                <div className="mx-auto max-w-6xl">
                    <div className="flex justify-between">   
                        <div className="py-4">
                            <h1 className="text-3xl font-bold">Legend Model Shop</h1>
                        </div>

                        <div className="py-4 mt-2">
                            {props.auth.user ? (
                                <Link href={route('dashboard')} className="text-sm text-gray-700 underline">
                                    Cart
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-sm text-gray-700 underline">
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="ml-4 text-sm text-gray-700 underline"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mt-10">
                        <h1 className="text-6xl font-bold leading-normal">LEGEND<br/>MODEL<br/>SHOP</h1>
                    </div>   
                    <SearchBar />
                </div>
                <ProductViewer />
            </div>
        </>
    );
}
