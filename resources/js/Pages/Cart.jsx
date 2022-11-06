import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link} from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

function sumPrice(allUserProducts) {
    let sum = 0.0;

    allUserProducts.forEach((p) => {
        sum += parseFloat(p.productQuantity) * parseFloat(p.MSRP);
    });

    return sum.toFixed(2);
}

function handleCheckout() {
    axios
        .post(`/checkout/`)
        .then(() => {window.location.reload(false);})
        .catch((err) => {
            console.log(err);
        });

}


export default function Cart({ auth, allUserProducts, errors }) {

    const count_items = allUserProducts.length;

    const [showToast, setShowToast] = useState(false);

    function removeFromCart(productCode) {
        Inertia.post(`/remove-from-cart/${productCode}`);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2000);
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
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
                        <div className="bg-black flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-white">
                            <p className="font-bold text-white flex items-center">
                                Remove</p>
                        </div>
                        <div className="p-3 bg-black break-words text-white">
                            Item removed successfully.
                        </div>
                    </div>
            )}

                <div className="bg-white pb-16">
                    <div className="max-w-7xl m-auto">
                        <div className="flex border-4 border-black shadow-md my-10 mx-auto overflow-x-auto">
                            <div
                                className="w-full bg-white px-10 py-10"
                            >
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
                                {allUserProducts.map((p) => (
                                    <div className="flex items-center  border-4 border-white -mx-8 px-6 py-5">
                                        <div className="flex w-3/5">
                                            <div className="flex flex-col justify-between ml-4 flex-grow">
                                                <span className="font-bold text-xl">
                                                    {p.productName}
                                                </span>
                                                <div className="bg-white">
                                                    <div className="py-3">
                                                        <div className="bg-black h-min w-min px-3 py-1">
                                                            <span className="text-lg font-bold text-white">
                                                                {p.productScale}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center w-1/5">
                                            <svg
                                                className="fill-current text-gray-600 w-3"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                            </svg>

                                            <input
                                                className="mx-2 border text-center w-20"
                                                type="text"
                                                value={p.productQuantity}
                                            />

                                            <svg
                                                className="fill-current text-gray-600 w-3"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                            </svg>
                                        </div>
                                        <span className="text-center w-1/5 font-semibold text-sm">
                                            $ {p.MSRP}
                                        </span>
                                        <span className="text-center w-1/5 font-semibold text-sm">
                                            ${" "}
                                            {(
                                                parseFloat(p.MSRP) *
                                                parseFloat(p.productQuantity)
                                            ).toFixed(2)}
                                        </span>
                                        <button onClick={() => removeFromCart(p.productCode)} method="post">
                                        <span className="material-symbols-outlined align-middle">
                                            delete
                                        </span>
                                        </button>
                                    </div>
                                ))}
                                <a
                                    href="/"
                                    className="flex font-semibold text-l mt-10"
                                >
                                    <Link href="/">
                                        <span className="material-symbols-outlined align-middle px-2">
                                            keyboard_backspace
                                        </span>
                                        Continue shopping
                                    </Link>
                                </a>
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
                        <button className="border-4 border-white  bg-white font-semibold text-black hover:text-white hover:bg-black py-2 text-sm  uppercase w-full px-2"
                                onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
