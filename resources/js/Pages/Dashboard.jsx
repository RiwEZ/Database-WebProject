// import React from 'react';
import React, { useEffect, useState } from "react";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import '../../css/product.css';


export default function Dashboard(props) {

    // const [det, setdet] = useState("ss");

    // let orders = props.orders;
    let ordersdetail = props.ordersDetail;
    // let auth = props.auth;
    function uniq_fast(a) {
        var seen = {};
        var out = [];
        var len = a.length;
        var j = 0;
        for (var i = 0; i < len; i++) {
            var item = a[i];
            var key = a[i].orderNumber;
            if (seen[key] !== 1) {
                seen[key] = 1;
                out[j++] = item;
            }
        }
        return out;
    }


    function get_detail(Number) {

        return <>

            {ordersdetail.filter(list => {
                return list.orderNumber == Number
            }).map(advance =>

                <li className="flex flex-row justify-evenly">
                    product {advance.productName} , Qyt: {advance.quantityOrdered} , priceEach: {advance.priceEach}
                </li>

            )
            }

        </>


    }


    function adminDash() {
        return (<>

            <div className="w-5/6 grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-10 my-10 mx-8 ">
                {uniq_fast(ordersdetail).map(orders => <>


                    <div id="popup1" className="overlay">
                        <div className="popup">
                            <h2>OrderDetail</h2>
                            <a className="close" href="#">&times;</a>
                            <div className="content">
                                {get_detail(orders.orderNumber)}
                            </div>
                        </div>
                    </div>


                    <a href="#popup1">

                        <div className={"transition ease-in-out p-6 bg-white h-min hover:scale-110 cursor-pointer" + (orders.status === 'Shipped' ? " bg-green-500" : " bg-red-600")} >


                            <div className="flex justify-between">
                                <h4 className="text-l font-bold mr-0.5">orderNumber: {orders.orderNumber} </h4>
                                <div className="bg-black h-min">
                                    <h4 className="text-white font-bold text-xl p-1">Status: {orders.status}</h4>

                                </div>
                            </div>
                            <h4 className="pt-2 text-xl font-bold">shippedDate: {orders.shippedDate}</h4>
                            <h4 className="text-xl font-bold">orderDate: {orders.orderDate}</h4>


                        </div>


                    </a>

                </>

                )}
            </div>
        </>)
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            {console.log(props)}
            <Head title="Dashboard" />

            <div className="py-12 flex place-content-center">
                {adminDash()}

            </div>

        </AuthenticatedLayout>
    );
}

