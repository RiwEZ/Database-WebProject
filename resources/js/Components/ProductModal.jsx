import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

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

    const [loadingAddToCart, setLoadAddToCart] = useState(false);

    function handleAddToCart() {
        setLoadAddToCart(true);

        // this should be post
        Inertia.get(`/add-to-cart/${productCode}`);
        // promise here bla bla to change button
        // when done setLoadAddToCart(false)
    }

    function cartButton() {
        let btn = <></>;

        if (!loadingAddToCart) {
            btn = (
                <button
                    className="btn p-2 border border-white bg-white font-bold text-black text-xl
                                    hover:bg-black hover:text-white transition ease-in-out duration-150"
                    onClick={handleAddToCart}
                >
                    {loadingAddToCart ? (
                        <>
                            <span className="animate-spin material-symbols-outlined align-middle mr-2">
                                rotate_right
                            </span>
                            Processing...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined align-middle mr-2">
                                shopping_cart
                            </span>
                            ADD TO CART
                        </>
                    )}
                </button>
            );
        } else {
            btn = (
                <div className="btn p-2 border border-white bg-white font-bold text-black text-xl cursor-progress">
                    <span className="animate-spin material-symbols-outlined align-middle mr-2">
                        rotate_right
                    </span>
                    Processing...
                </div>
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
                            <p>{productDescription}</p>
                            <h5 className="text-xl font-bold mt-20">
                                In Stock: {quantityInStock}
                            </h5>
                            <div className="flex justify-between">
                                <h5 className="text-2xl font-bold">
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
