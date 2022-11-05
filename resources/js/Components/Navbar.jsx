import React from "react";
import { Link } from "@inertiajs/inertia-react";
import UserDropdown from "@/Components/UserDropdown";

export default function Navbar(props) {
    return (
        <div className="flex justify-between">
        <div className="p-4">
            <Link href='/'>
            <h1 className="text-3xl font-bold">
                LEGEND MODEL SHOP
            </h1>
            </Link>
        </div>

        <div className="p-4 mt-2 inline-block">
            {props.auth.user ? (
                <div className="flex flex-row">
                    {props.showCart ? (
                    <Link
                        href="cart"
                        className="text-md text-gray-700 font-semibold px-4"
                    >
                        <span class="material-symbols-outlined align-middle  pb-1 text-lg">shopping_cart</span>
                        CART
                    </Link>):(
                    <Link
                        href="/"
                        className="text-md text-gray-700 font-semibold px-4"
                    >
                        <span class="material-symbols-outlined align-middle  pb-1 text-lg">home</span>
                        Home
                    </Link>)}
                    <div className="pt-0.5">
                    <UserDropdown
                        username={props.auth.user.name}
                    />
                    </div>

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
    );
}