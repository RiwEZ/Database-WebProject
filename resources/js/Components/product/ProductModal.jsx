import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import { Link } from "@inertiajs/inertia-react";

export default function ProductModal({ product, handleClose }) {
    const {
        productCode,
        MSRP,
        productName,
        productLine,
        productScale,
        quantityInStock,
        productDescription,
    } = product || {};

    const prod_img = '/product_img/' + productCode + '.jpg';

    const [showToast, setShowToast] = useState(false);

    const successBtnDuration = 2000;
    // idle, processing, success, goToCart
    const [cartBtnState, setCartBtnState] = useState("idle");

    function handleAddToCart() {
        setCartBtnState("processing");

        axios
            .post(`/add-to-cart/`, { productCode })
            .then(() => {
                setCartBtnState("success");
                setTimeout(() => {
                    setCartBtnState("goToCart");
                }, successBtnDuration);
            })
            .catch((err) => {
                setCartBtnState("idle");
                if (err.response) {
                    if (err.response.status === 401) {
                        window.location.href = "/login";
                    }
                } else {
                    setShowToast(true);
                    setTimeout(() => {
                        setShowToast(false);
                    }, 2000);
                    // alert("Error adding this to cart. Please try again later.");
                }
            });
    }

    function cartButton() {
        let btn = <></>;

        if (cartBtnState === "idle") {
            btn = (
                <button
                    className="btn p-2 border-white border-2 bg-white font-bold text-black text-xl
                                    hover:bg-black hover:text-white transition ease-in-out duration-150 "
                    onClick={handleAddToCart}
                >
                    <span className="material-symbols-outlined align-middle mr-2">
                        shopping_cart
                    </span>
                    ADD TO CART
                </button>
            );
        } else if (cartBtnState === "processing") {
            btn = (
                <div className="btn p-2 border border-white bg-white font-bold text-black text-xl cursor-progress">
                    <span className="animate-spin material-symbols-outlined align-middle mr-2">
                        rotate_right
                    </span>
                    PROCESSING...
                </div>
            );
        } else if (cartBtnState === "success") {
            btn = (
                <div className="btn p-2 border border-white bg-green-400 font-bold text-black text-xl">
                    <span className="material-symbols-outlined align-middle mr-2">
                        check_circle
                    </span>
                    SUCCESS
                </div>
            );
        } else if (cartBtnState === "goToCart") {
            btn = (
                <Link
                    className="btn p-2 border-white border-2 bg-white font-bold text-black text-xl
                                    hover:bg-black hover:text-white transition ease-in-out duration-150 "
                    href="/cart"
                >
                    <span className="material-symbols-outlined align-middle mr-2">
                        shopping_cart
                    </span>
                    GO TO CART
                </Link>
            );
        }

        return btn;
    }

    return (
        <>
            {product && (
                <div
                    className="transition ease-in-out fixed bg-black bg-opacity-70 z-20
                top-0 left-0 w-full h-full flex justify-center align-middle text-white overflow-auto"
                    key={productCode}
                >
                {showToast && (
                    <div class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
                        <div class="bg-red-600 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-white">
                            <p class="font-bold text-white flex items-center">
                                Error</p>
                        </div>
                        <div class="p-3 bg-red-600 break-words text-white">
                        Error adding this to cart. Please try again later.
                        </div>
                    </div>
            )}
                    <div className="bg-black opacity-100 h-min max-w-3xl m-auto border-white border-4">
                        {/* picture here */}
                        <button
                            className="float-right bg-white text-black w-10 h-10 align-middle 
                            border-white border-l-4 border-b-4 hover:bg-black hover:text-white transition ease-in-out duration-150"
                            onClick={handleClose}
                        >
                            <span className="material-symbols-outlined font-bold text-4xl">
                                close
                            </span>
                        </button>
                        <div className="p-6">
                            <h4 className="text-2xl font-bold my-4">
                                {productName}
                            </h4>
                            <div className="flex my-4">
                                <h4 className="pt-2 text-xl font-bold mr-6">
                                    {productLine}
                                </h4>
                                <div className="bg-white h-min w-min">
                                    <h4 className="text-black font-bold text-xl p-1">
                                        {productScale}
                                    </h4>
                                </div>
                            </div>
                            <div className="flex justify-center py-2">
                                <img src={prod_img} alt="product image" className="w-96 pt-4" />
                            </div>

                            <p className="pt-4">{productDescription}</p>
                            <h5 className="text-xl font-bold mt-20">
                                In Stock: {quantityInStock}
                            </h5>
                            <div className="flex justify-between">
                                <h5 className="text-2xl font-bold pt-2">
                                    Price {MSRP}$
                                </h5>
                                {cartButton()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
