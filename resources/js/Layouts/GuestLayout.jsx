import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Guest({ children }) {
    return (
        <div className="w-full h-screen flex flex-col lg:flex-row">
            <div className="flex-1 bg-[url('../img/boeing-767.png')] bg-no-repeat lg:bg-[center_26rem]">
                <div className="py-4 px-24">
                    <Link href="/">
                        <h1 className="text-3xl font-bold">
                            LEGEND MODEL SHOP
                        </h1>
                    </Link>
                </div>
                <div className="py-16 px-24">
                    <h1 className="text-5xl lg:text-7xl font-bold leading-normal">
                        DISCOVER
                        <br/>
                        FANTASTIC
                        <br/>
                        MODELS
                    </h1>
                </div>
            </div>
            <div className="flex-initial bg-black h-full justify-items-center lg:w-1/3">
                <div className="bg-black p-10 sm:p-20 w-full h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
