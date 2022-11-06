import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

function sumPrice(productsInCart) {
    let sum = 0.0;

    productsInCart.forEach((p) => {
        let q = p.productQuantity;
        if (q === "") q = 0;
        sum += parseFloat(q) * parseFloat(p.MSRP);
    });

    return sum.toFixed(2);
}

const errorToastShowDuration = 4000;

export default function Cart({ auth, allUserProducts, errors }) {
    const count_items = allUserProducts.length;

    const [showToast, setShowToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

    const [productArray, setProductArray] = useState(allUserProducts);
    const [entriesWithError, setEntriesWithError] = useState([]);

    useEffect(() => {
        setProductArray(allUserProducts);
    });

    function removeFromCart(productCode) {
        Inertia.post(`/remove-from-cart/${productCode}`);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, errorToastShowDuration);
    }

    function handleCheckout() {
        const quantityUpdates = [];
        productArray.forEach((p) => {
            quantityUpdates.push(
                sendEditProductQuantity(p.productCode, p.productQuantity)
            );
        });

        Promise.all(quantityUpdates)
            .then(() => {
                axios
                    .post(`/checkout/`)
                    .then(() => {
                        window.location.reload(false);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                setShowErrorToast(true);
                setTimeout(() => {
                    setShowErrorToast(false);
                }, errorToastShowDuration);
            });
    }

    function sendEditProductQuantity(productCode, newQuantity) {
        if (newQuantity < 1) {
            const newEntriesWithError = [...entriesWithError, productCode];
            setEntriesWithError(newEntriesWithError);
            setShowErrorToast(true);
            setTimeout(() => {
                setShowErrorToast(false);
            }, errorToastShowDuration);

            return Promise.reject();
        }

        return axios
            .post("/edit-cart-quantity", { productCode, newQuantity })
            .then((response) => {
                const newEntriesWithError = entriesWithError.filter(
                    (e) => e != productCode
                );
                setEntriesWithError(newEntriesWithError);

                const newProductArray = [...productArray];
                for (let i = 0; i < newProductArray.length; i++) {
                    if (
                        newProductArray[i].productCode ===
                        response.data[0].productCode
                    ) {
                        newProductArray[i].productQuantity =
                            response.data[0].productQuantity;
                    }
                }
                console.log(newProductArray);
                console.log(response);
                setProductArray(newProductArray);
                return Promise.resolve();
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401) {
                        window.location.href = "/login";
                    }
                }

                setShowErrorToast(true);
                setTimeout(() => {
                    setShowErrorToast(false);
                }, errorToastShowDuration);

                const newEntriesWithError = [
                    ...entriesWithError,
                    err.response.data.productCode,
                ];
                setEntriesWithError(newEntriesWithError);

                return Promise.reject(err);
            });
    }

    function handleInputQuantityChange(productCode, productQuantity) {
        const newProductArray = [...productArray];

        for (let i = 0; i < newProductArray.length; i++) {
            if (newProductArray[i].productCode === productCode) {
                newProductArray[i].productQuantity = productQuantity;
            }
        }
        setProductArray(newProductArray);
    }

    function returnEntryBg(productCode) {
        if (entriesWithError.find((p) => p === productCode))
            return "bg-red-400";
        else return "bg-white";
    }

    return (
        <div>
            <AuthenticatedLayout
                auth={auth}
                errors={errors}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {auth.user.name}'s shopping cart
                    </h2>
                }
            >
                <Head title="Cart" />
                {showToast && (
                    <div
                        className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding block mb-3"
                        id="static-example"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        data-mdb-autohide="false"
                    >
                        <div className="bg-black flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-white">
                            <p className="font-bold text-white flex items-center">
                                Remove
                            </p>
                        </div>
                        <div className="p-3 bg-black break-words text-white">
                            Item removed successfully.
                        </div>
                    </div>
                )}

                {showErrorToast && (
                    <div
                        className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding block mb-3"
                        id="static-example"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        data-mdb-autohide="false"
                    >
                        <div className="bg-red-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-white">
                            <p className="font-bold text-white flex items-center">
                                Error
                            </p>
                        </div>
                        <div className="p-3 bg-red-500 break-words text-white">
                            You order more than what in stock, or your order is
                            invalid.
                        </div>
                    </div>
                )}

                <div className="bg-white pb-16">
                    <div className="max-w-7xl m-auto">
                        <div className="flex border-4 border-black shadow-md my-10 mx-auto overflow-x-auto">
                            <div className="w-full bg-white px-10 py-10">
                                <div className="flex justify-between border-b pb-8">
                                    <h1 className="font-semibold text-2xl">
                                        Shopping Cart
                                    </h1>
                                    {/* numbers of items */}
                                    <h2 className="font-semibold text-2xl">
                                        {count_items} Items
                                    </h2>
                                </div>
                                <div className="flex mt-10 mb-5">
                                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-3/5">
                                        Product Details
                                    </h3>
                                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                                        Quantity
                                    </h3>
                                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                                        Price
                                    </h3>
                                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                                        Total
                                    </h3>
                                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/12"></h3>
                                </div>
                                {productArray.map((p) => (
                                    <div
                                        className={
                                            "flex items-center  border-4 border-white -mx-8 px-6 py-5 " +
                                            returnEntryBg(p.productCode)
                                        }
                                    >
                                        <div class="flex w-3/5">
                                            <div class="flex flex-col justify-between ml-4 flex-grow">
                                                <span class="font-bold text-xl">
                                                    {p.productName}
                                                </span>
                                                <div className="py-3">
                                                    <div className="bg-black h-min w-min px-3 py-1">
                                                        <span className="text-lg font-bold text-white">
                                                            {p.productScale}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex justify-center w-1/5">
                                            <button
                                                onClick={() => {
                                                    if (p.productQuantity > 1) {
                                                        sendEditProductQuantity(
                                                            p.productCode,
                                                            p.productQuantity -
                                                                1
                                                        );
                                                    }
                                                }}
                                            >
                                                <svg
                                                    class="fill-current text-gray-600 w-4"
                                                    viewBox="0 0 448 512"
                                                >
                                                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                </svg>
                                            </button>

                                            <input
                                                class="mx-2 border text-center w-20"
                                                type="number"
                                                value={p.productQuantity}
                                                min="1"
                                                onChange={(e) =>
                                                    handleInputQuantityChange(
                                                        p.productCode,
                                                        e.target.value
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    sendEditProductQuantity(
                                                        p.productCode,
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <button
                                                onClick={() =>
                                                    sendEditProductQuantity(
                                                        p.productCode,
                                                        p.productQuantity + 1
                                                    )
                                                }
                                            >
                                                <svg
                                                    class="fill-current text-gray-600 w-4"
                                                    viewBox="0 0 448 512"
                                                >
                                                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <span className="text-center w-1/5 font-semibold text-sm">
                                            $ {p.MSRP}
                                        </span>
                                        <span className="text-center w-1/5 font-semibold text-sm">
                                            {p.productQuantity === ""
                                                ? parseFloat(p.MSRP) *
                                                  parseFloat(0)
                                                : (
                                                      parseFloat(p.MSRP) *
                                                      parseFloat(
                                                          p.productQuantity
                                                      )
                                                  ).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() =>
                                                removeFromCart(p.productCode)
                                            }
                                            method="post"
                                        >
                                            <span class="material-symbols-outlined align-middle">
                                                delete
                                            </span>
                                        </button>
                                    </div>
                                ))}

                                <Link
                                    href="/"
                                    className="flex font-semibold text-l mt-10 w-max"
                                >
                                    <span className="material-symbols-outlined align-middle px-2">
                                        keyboard_backspace
                                    </span>
                                    Continue shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <div className="bg-black py-5 w-full fixed bottom-0">
                <div className="flex justify-between max-w-6xl m-auto font-bold text-white text-2xl align-middle px-5">
                    <div className=" pt-1">
                        TOTAL ${sumPrice(allUserProducts)}
                    </div>
                    <div className="">
                        <button
                            className="border-4 border-white  bg-white font-semibold text-black hover:text-white hover:bg-black py-2 text-sm  uppercase w-full px-2"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
