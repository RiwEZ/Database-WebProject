import React, { useState, useRef, useEffect } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import ProductViewer from "@/Components/ProductViewer";

import Navbar from "@/Components/Navbar";

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
                    <Navbar
                        auth={props.auth}
                        showCart={true}
                    /> 
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
