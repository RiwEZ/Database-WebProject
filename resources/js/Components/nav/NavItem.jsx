import React from "react"
import { Link } from "@inertiajs/inertia-react"
import UserDropdown from "../UserDropdown"
import { useState } from "react"
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

    const cartHoverStyle = () => {
        let base = "hidden bg-zinc-100 border border-1 shadow-lg p-4 absolute z-0 w-80";
        if (carts && carts.length > 0) {
            return base + " group-hover:block";
        }
        return base;
    }

    return (
        <>
            <div className="p-4 mt-2 inline-block">
                {auth.user ? (
                    <div className="flex flex-row items-start">

                        {auth.user.isAdmin ? (<Link
                            href="dashboard"
                            className="text-md text-gray-700 font-semibold px-4 flex"
                        >
                            Dashboard
                        </Link>) : (<></>)}
                        {showCart ? (
                            <div className="group relative inline-block" onMouseEnter={fetch_carts()}>
                                <Link
                                    href="cart"
                                    className="text-md text-gray-700 font-semibold px-4 flex items-center"
                                >
                                    {carts 
                                        ? carts.length > 0 && <p className="mr-1 bg-black text-white w-7 text-center rounded">{carts.length}</p> 
                                        : <></>}
                                    <span className="material-symbols-outlined align-middle text-lg">shopping_cart</span>
                                    <p>CART</p>
                                </Link>

                                <div
                                    className={cartHoverStyle()}>
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
                                className="text-md text-gray-700 font-semibold px-4 flex items-center"
                            >
                                <span className="material-symbols-outlined align-middle pb-1 text-lg">home</span>
                                <p className="mb-1">Home</p>
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
