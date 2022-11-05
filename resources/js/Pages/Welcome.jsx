import React, { useState, useRef, useEffect } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import ProductViewer from "@/Components/ProductViewer";
import UserDropdown from "@/Components/UserDropdown";

export default function Welcome(props) {
    const [showNavbarMenu, setShowNavbarMenu] = useState(false);

    const bannerRef = useRef(null);

    const handleBannerScroll = (e) => {
        if (bannerRef.current.getBoundingClientRect().bottom <= 0) {
            setShowNavbarMenu(true);
        } else {
            setShowNavbarMenu(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleBannerScroll);

        return () => {
            window.removeEventListener("scroll", handleBannerScroll);
        };
    }, [handleBannerScroll]);

    return (
        <>
            <Head title="LEGEND MODEL SHOP" />
            <div
                className="banner bg-[url('../img/rx7-1993.png')] bg-[center_-5rem] bg-no-repeat flex max-w-6xl m-auto"
                ref={bannerRef}
            >
                <div className="w-full">
                    <div className="flex justify-between">
                        <div className="p-4">
                            <h1 className="text-3xl font-bold">
                                LEGEND MODEL SHOP
                            </h1>
                        </div>

                        <div className="p-4 mt-2 inline-block">
                            {props.auth.user ? (
                                <div className="flex flex-row">
                                    <Link
                                        href="cart"
                                        className="text-md text-gray-700 font-semibold px-4"
                                    >
                                        CART
                                    </Link>
                                    <UserDropdown
                                        username={props.auth.user.name}
                                    />
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
                    </div>
                    <div className="h-full">
                        <h1 className="text-6xl font-bold leading-normal p-4 mb-16 text-black white-outline-text">
                            <span className="white-outline-text">HIGHLY DETAILED</span>
                            <br/>
                            <span className="white-outline-text">VEHICLE</span>
                            <br/>
                            <span className="white-outline-text">MODELS</span>
                        </h1>
                    </div>
                </div>
            </div>
            <ProductViewer
                auth={props.auth}
                products={props.products}
                showNavbarMenu={showNavbarMenu}
            />
        </>
    );
}
