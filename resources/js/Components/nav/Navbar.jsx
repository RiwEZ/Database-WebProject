import React from "react";
import { Link } from "@inertiajs/inertia-react";
import NavItem from "./NavItem";

export default function Navbar({auth, showCart}) {
    return (
        <div className="flex justify-between">
        <div className="p-4">
            <Link href='/'>
            <h1 className="text-3xl font-bold">
                LEGEND MODEL SHOP
            </h1>
            </Link>
        </div>
        <NavItem auth={auth} showCart={showCart}></NavItem>
    </div>
    );
}
