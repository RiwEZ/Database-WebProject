import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';

function sumPrice(carts) {
    let sum = 0;
    {carts && Object.keys(carts).map((key, index) => {
        sum += parseFloat(carts[key].buyPrice) * parseFloat(carts[key].quantity);
    })}

    return sum.toFixed(2);
}

export default function Cart({auth, cartBox, errors}) {
    const carts = cartBox;
    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}'s shopping cart</h2>}
        >
            <Head title="Cart" />

            <div class="bg-white">
                <div class="max-w-7xl m-auto">
                    <div class="flex border-4 border-black shadow-md my-10">
                        <div class="w-3/4 bg-white px-10 py-10">
                            <div class="flex justify-between border-b pb-8">
                                <h1 class="font-semibold text-2xl">
                                    Shopping Cart
                                </h1>
                                {/* numbers of items */}
                                <h2 class="font-semibold text-2xl">1 Items</h2>
                            </div>
                            <div class="flex mt-10 mb-5">
                                <h3 class="font-semibold text-gray-600 text-xs uppercase w-3/5">
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
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/12">
                                    
                                </h3>
                            </div>
                            {carts && Object.keys(carts).map((key, index) =>
                                                        <div class="flex items-center  border-4 border-white -mx-8 px-6 py-5" key={index}>
                                                        <div class="flex w-3/5">
                                                            <div class="flex flex-col justify-between ml-4 flex-grow">
                                                                <span class="font-bold text-xl">
                                                                    {carts[key].name}
                                                                </span>
                                                                <div className='bg-white'>
                                                                <div className='py-3'>
                                                                    <div className='bg-black h-min w-min px-3 py-1'>
                                                                    <span class="text-lg font-bold text-white">
                                                                    {carts[key].scale}
                                                                </span>
                                                                </div>
                                                                </div>
                                                                
                                                                
                                                                </div>
                                                                
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
                                                                class="mx-2 border text-center w-20"
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
                                                        $ {carts[key].buyPrice}
                                                        </span>
                                                        <span class="text-center w-1/5 font-semibold text-sm">
                                                        $ {parseFloat(carts[key].buyPrice) * parseFloat(carts[key].quantity)}
                                                        </span>

                                                        <Link
                                                                    href={`/remove-from-cart/${carts[key].id}`}
                                                                    method="post"
                                                                    class="text-center w-1/12 font-semibold hover:text-red-400 text-red-500 text-md"
                                                                >
                                                                    <span class="material-symbols-outlined align-middle">
delete
</span>
                                                                    
                                                                </Link>
                                                    </div>
                            )}
                            <a
                                href="/"
                                class="flex font-semibold text-l mt-10"
                            >
                                <Link
                                        href="/"
                                    >
                                        <span class="material-symbols-outlined align-middle px-2">
keyboard_backspace
</span>
                                        Continue shopping
                                    </Link>
                            </a>
                        </div>

                        <div id="summary" class="w-1/4 px-8 py-10">
                            <h1 class="font-semibold text-2xl border-b pb-8">
                                Order Summary
                            </h1>
                            <div className="flex flex-col justify-between">
                            {carts && Object.keys(carts).map((key, index) => 
                            <div class="flex justify-between mt-10 mb-5">
                                
                                                                <span class="font-semibold text-sm uppercase">
                                                                {carts[key].name}
                                                                </span>
                                
                                <span class="font-semibold text-sm">{parseFloat(carts[key].buyPrice) * parseFloat(carts[key].quantity)}</span>
                            </div>
                            )}
                            <div class="border-t mt-8 justify-items-end">
                                <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                                    <span>Total cost</span>
                                    <span>$ {sumPrice(carts)}</span>
                                </div>
                                <button class="border-4 border-black  bg-black font-semibold text-white hover:text-black hover:bg-white py-2 text-sm  uppercase w-full">
                                    Checkout
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
