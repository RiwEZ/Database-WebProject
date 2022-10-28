import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';

export default function Cart({auth, cartBox, errors}) {
    const carts = cartBox;
    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}'s shopping cart</h2>}
        >
            <Head title="Cart" />

            <div class="bg-gray-100">
                <div class="container mx-auto mt-10">
                    <div class="flex shadow-md my-10">
                        <div class="w-3/4 bg-white px-10 py-10">
                            <div class="flex justify-between border-b pb-8">
                                <h1 class="font-semibold text-2xl">
                                    Shopping Cart
                                </h1>
                                {/* numbers of items */}
                                <h2 class="font-semibold text-2xl">1 Items</h2>
                            </div>
                            <div class="flex mt-10 mb-5">
                                <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">
                                    Product Details
                                </h3>
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                                    Quantity
                                </h3>
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                                    Price
                                </h3>
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                                    Total
                                </h3>
                            </div>
                            {Object.keys(carts).map((key, index) =>
                                                        <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={index}>
                                                        <div class="flex w-2/5">
                                                            <div class="w-20">
                                                                <img
                                                                    class="h-24"
                                                                    src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div class="flex flex-col justify-between ml-4 flex-grow">
                                                                <span class="font-bold text-sm">
                                                                    {carts[key].name}
                                                                </span>
                                                                <span class="text-red-500 text-md">
                                                                    Scale {carts[key].scale}
                                                                </span>
                                                                <Link
                                                                    href={`/remove-from-cart/${carts[key].id}`}
                                                                    class="font-semibold hover:text-red-500 text-gray-500 text-md"
                                                                >
                                                                    Remove
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div class="flex justify-center w-1/5">
                                                            <svg
                                                                class="fill-current text-gray-600 w-3"
                                                                viewBox="0 0 448 512"
                                                            >
                                                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                            </svg>
                        
                                                            <input
                                                                class="mx-2 border text-center w-10"
                                                                type="text"
                                                                value={carts[key].quantity}
                                                            />
                        
                                                            <svg
                                                                class="fill-current text-gray-600 w-3"
                                                                viewBox="0 0 448 512"
                                                            >
                                                                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                            </svg>
                                                        </div>
                                                        <span class="text-center w-1/5 font-semibold text-sm">
                                                        {carts[key].buyPrice}$
                                                        </span>
                                                        <span class="text-center w-1/5 font-semibold text-sm">
                                                        {parseFloat(carts[key].buyPrice) * parseFloat(carts[key].quantity)}
                                                        </span>
                                                    </div>
                            )}
                            <a
                                href="/"
                                class="flex font-semibold text-indigo-600 text-sm mt-10"
                            >
                                <svg
                                    class="fill-current mr-2 text-indigo-600 w-4"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                                </svg>
                                <Link
                                        href="/"
                                    >
                                        Continue shopping
                                    </Link>
                            </a>
                        </div>

                        <div id="summary" class="w-1/4 px-8 py-10">
                            <h1 class="font-semibold text-2xl border-b pb-8">
                                Order Summary
                            </h1>
                            <div class="flex justify-between mt-10 mb-5">
                                <span class="font-semibold text-sm uppercase">
                                    Items 3
                                </span>
                                <span class="font-semibold text-sm">590$</span>
                            </div>
                            <div>
                                <label class="font-medium inline-block mb-3 text-sm uppercase">
                                    Shipping
                                </label>
                                <select class="block p-2 text-gray-600 w-full text-sm">
                                    <option>Standard shipping - $10.00</option>
                                </select>
                            </div>
                            <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase my-10">
                                Apply
                            </button>
                            <div class="border-t mt-8">
                                <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                                    <span>Total cost</span>
                                    <span>$600</span>
                                </div>
                                <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
