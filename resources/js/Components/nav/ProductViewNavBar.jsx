import React from "react";
import { Link } from "@inertiajs/inertia-react";
import SearchBar from "../nav/SearchBar";
import NavItem from "../nav/NavItem";

export default function ProductViewNavBar(props) {
    return (
        <div className="flex justify-between flex-wrap">
            {props.showNavbarMenu && (
                <div className="p-4 hidden lg:inline">
                    <h1 className="text-3xl font-bold whitespace-nowrap">
                        LEGEND
                    </h1>
                </div>
            )}
            <div className="flex-grow" style={{ minWidth: "320px" }}>
                <SearchBar onChange={props.searchOnChange} />
            </div>
            {props.showNavbarMenu && (
                <NavItem auth={props.auth} showCart={true} />
            )}
        </div>
    );
}
