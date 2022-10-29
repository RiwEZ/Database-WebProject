import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";

export default function Guest({ children }) {
    return (
        <div className="w-full h-full flex flex-col sm:flex-row">
            <div className="flex-1 bg-[url('../img/boeing-767.png')] bg-no-repeat sm:bg-[center_26rem]">
                <div className="py-4 px-5">
                    <Link href="/">
                        <h1 className="text-3xl font-bold">
                            LEGEND MODEL SHOP
                        </h1>
                    </Link>
                </div>
                <div className="py-10 px-5">
                    <h1 className="text-5xl sm:text-7xl font-bold leading-normal">
                        DISCOVER
                        <br />
                        FANTASTIC
                        <br />
                        MODELS
                    </h1>
                </div>
            </div>
            <div className="flex-initial bg-black h-full justify-items-center">
                <div className="bg-black p-10 sm:p-20 w-full h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
