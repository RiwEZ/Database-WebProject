import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import Expire from "@/Components/Expire";

export default function Guest({ children }) {
    const { flash } = usePage().props;
    return (
        <div className="w-full h-screen flex flex-col lg:flex-row">
            {flash.message && (
                <Expire delay="5000">
                    <div class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
                        <div class="bg-yellow-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-yellow-400 rounded-t-lg">
                            <p class="font-bold text-white flex items-center">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
                                </svg>
                                ALERT</p>
                        </div>
                        <div class="p-3 bg-yellow-500 rounded-b-lg break-words text-white">
                            {flash.message}
                        </div>
                    </div>
                </Expire>
            )}
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
                        <span className="bg-white">DISCOVER</span>
                        <br />
                        <span className="bg-white">FANTASTIC</span>
                        <br />
                        <span className="bg-white">MODELS</span>
                    </h1>
                </div>
            </div>
            <div className="flex-initial bg-black h-full justify-items-center lg:w-1/3">
                <div className="bg-black p-10 sm:p-20 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
