import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";

export default function Guest({ children }) {
    return (
        <div className="grid grid-cols-3 gap-0 w-full h-screen">
            <div className="col-span-2 bg-[url('../img/boeing-767.png')] bg-no-repeat bg-[center_26rem] w-full h-full">
                <div className="py-12 px-20">
                    <Link href="/">
                    <h1 className="text-3xl font-bold">LEGEND MODEL SHOP</h1>
                    </Link>
                </div>
                <div className="py-4 px-20">
                        <h1 className="text-7xl font-bold leading-normal">DISCOVER<br/>FANTASTIC<br/>MODELS</h1>
                </div>
            </div>
            <div className="grid col-span-1 bg-black w-full h-full justify-items-center">
                <div className="bg-black p-20 w-full h-full">{children}</div>
            </div>
        </div>
    );
}
