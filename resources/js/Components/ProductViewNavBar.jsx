import React from "react";
import { Link } from "@inertiajs/inertia-react";
import UserDropdown from "@/Components/UserDropdown";
import SearchBar from "./SearchBar";

export default function ProductViewNavBar(props) {
    return (
        <div className="flex justify-between">
            {props.showNavbarMenu && (
                <div className="p-4 hidden lg:inline">
                    <h1 className="text-3xl font-bold whitespace-nowrap">
                        LEGEND
                    </h1>
                </div>
            )}
            <div className="w-full">
                <SearchBar onChange={props.searchOnChange} />
            </div>
            {props.showNavbarMenu && (
                <div className="p-4 mt-2 inline-block">
                    {props.auth.user ? (
                        <div className="flex flex-row">
                            <Link
                                href="cart"
                                className="text-md text-gray-700 font-semibold px-4"
                            >
                                CART
                            </Link>
                            <UserDropdown username={props.auth.user.name} />
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
            )}
        </div>
    );
}
