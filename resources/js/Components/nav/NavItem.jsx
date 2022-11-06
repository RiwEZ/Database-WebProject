import React from "react"
import { Link } from "@inertiajs/inertia-react"
import UserDropdown from "../UserDropdown"
import { useEffect } from "react"

export default function NavItem({auth, showCart}) {
    return (
        <>
            <div className="p-4 mt-2 inline-block">
                {auth.user ? (
                    <div className="flex flex-row">
                        {showCart ? (
                            <div className="group relative inline-block">
                                <Link
                                    href="cart"
                                    className="text-md text-gray-700 font-semibold px-4 flex"
                                >
                                    <span className="material-symbols-outlined align-middle pb-1 text-lg">shopping_cart</span>
                                    CART
                                </Link>
                                {/*
                                <div className="hidden group-hover:block bg-zinc-100 p-4 absolute z-0 top-6 left-4">
                                    TEST
                                </div>
                                */}
                            </div>
                            ) : (
                            <Link
                                href="/"
                                className="text-md text-gray-700 font-semibold px-4"
                            >
                                <span className="material-symbols-outlined align-middle pb-1 text-lg">home</span>
                                Home
                            </Link>)
                        }
                        <UserDropdown username={auth.user.name} />
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
        </>
    )
}
