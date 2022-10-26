import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";

export default function Guest({ children }) {
    return (
        <div className="grid grid-cols-3 gap-0 w-full h-screen">
            <div className="col-span-2 bg-gray-100 w-full h-full">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae eum sapiente maxime ut sint harum a aperiam quod nisi inventore dolorum iure illum ad tempora deserunt, dolores qui! Voluptate, aperiam.</p>
            </div>
            <div className="grid col-span-1 bg-black w-full h-full justify-items-center">
                <div className="bg-black p-20 w-full h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
