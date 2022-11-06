import React from "react";
import { Link } from "@inertiajs/inertia-react";
import NavItem from "./NavItem";

export default function Navbar({auth, showCart}) {
    return (
        <div className="flex justify-between flex-wrap">
            <Link href='/' className="p-4">
                <h1 className="text-2xl lg:text-3xl font-bold">
                    LEGEND MODEL SHOP
                </h1>
            </Link>
            <NavItem auth={auth} showCart={showCart}></NavItem>
        </div>
    );
}
