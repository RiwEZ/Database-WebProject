import React from "react"
import { Link } from "@inertiajs/inertia-react"
import UserDropdown from "../UserDropdown"
import { useEffect, useState } from "react"
import { Inertia } from "@inertiajs/inertia"
import axios from "axios"

export default function NavItem({ auth, showCart }) {
    const [carts, setCarts] = useState();

    const fetch_carts = () => {
        axios
            .get(`/usercart`)
            .then((resp) => {
                setCarts(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="p-4 mt-2 inline-block">
                {auth.user ? (
                    <div className="flex flex-row">
                        {showCart ? (
                            <div className="group relative inline-block" onMouseEnter={fetch_carts()}>
                                <Link
                                    href="cart"
                                    className="text-md text-gray-700 font-semibold px-4 flex"
                                >
                                    <span className="material-symbols-outlined align-middle pb-1 text-lg">shopping_cart</span>
                                    CART
                                </Link>

                                <div
                                    className="hidden group-hover:block bg-zinc-100 border border-2 drop-shadow p-4 absolute z-0 w-80 rounded-lg">
                                    {carts && carts.map(c =>
                                        <div className="flex justify-between">
                                            <span>{c.productName}</span>
                                            <span className="font-bold">{c.productQuantity}</span>
                                        </div>
                                    )}
                                </div>
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
