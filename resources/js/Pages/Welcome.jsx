import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import SearchBar from '@/Components/SearchBar';
import ProductViewer from '@/Components/ProductViewer';
import UserDropdown from '@/Components/UserDropdown';

export default function Welcome(props) {
    const [searchValue, setSearchValue] = useState("");

    return (
        <>
            <Head title="Welcome" />
            <div className="banner min-h-screen bg-[url('../img/rx7-1993.png')] bg-[center_-5rem] bg-no-repeat">
                <div className="mx-auto max-w-6xl">
                    <div className="flex justify-between">
                        <div className="p-4">
                            <h1 className="text-3xl font-bold">
                                LEGEND MODEL SHOP
                            </h1>
                        </div>

                        <div className="p-4 mt-2 inline-block">
                            {props.auth.user ? (
                                <div className="flex flex-row">
                                    <Link
                                        href='cart'
                                        className="text-md text-gray-700 font-semibold px-4"
                                    >
                                        CART
                                    </Link>
                                    <UserDropdown
                                        username={props.auth.user.name}
                                    />
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="text-md text-gray-700 font-semibold"
                                    >
                                        LOGIN
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="ml-4 text-md text-gray-700 font-semibold"
                                    >
                                        REGISTER
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="">
                        <h1 className="text-6xl font-bold leading-normal p-4 mb-16 text-black white-outline-text">
                            HIGHLY DETAILED
                            <br />
                            VEHICLE
                            <br/>
                            MODELS
                        </h1>
                    </div>
                    <SearchBar onChange={(e) => {
                        setSearchValue(e.target.value);
                    }} />
                </div>
                <ProductViewer products={props.products} searchValue={searchValue}/>
                <div>
                </div>
            </div>
        </>
    );
}
