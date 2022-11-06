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
            <div className="pt-4 max-w-2xl">
                <table>
                    {Number}
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                    </tr>
                    {ordersdetail.filter(list => {
                        return list.orderNumber == Number
                    }).map(advance =>
                        <tr>
                            <td className="px-5"> {advance.productName} </td> <td className="px-5">{advance.quantityOrdered}</td> <td className="px-5">{advance.priceEach}</td>
                        </tr>
                    )
                    }
                </table>
            </div>
        </>
    }

    function adminDash() {
        return (<>

            <div className="w-5/6 grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-10 my-10 mx-8 ">

                {uniq_fast(ordersdetail).map(orders =>
                    <>{console.log(orders)}
                        <div id={orders.orderNumber} className="overlay pt-20 ">

                            <div className="flex flex-col justify-center bg-white max-w-2xl m-auto py-5 px-5">
                                <div className="flex flex-row justify-between">
                                    <h2 className="px-6 pt-3 text-2xl font-bold">OrderDetail</h2>
                                    <a className="close text-5xl text-right px-4 " href="#">&times;</a>
                                </div>
                                <div className="pb-10 m-auto" key={orders.orderNumber}>
                                    {get_detail(orders.orderNumber)}
                                </div>
                            </div>
                        </div>

                        <a href={"#" + (orders.orderNumber)}>
                            <div className={"transition ease-in-out p-6 bg-white h-min hover:scale-110 cursor-pointer" + (orders.status === 'Shipped' ? " bg-green-500" : " bg-red-600")} >
                                <div className="flex justify-between">
                                    <h4 className="text-sm font-semibold mr-0.5">Order Number: {orders.orderNumber} </h4>
                                    <div className="bg-black h-min">
                                        <h4 className="text-white font-bold text-xl p-1">{orders.status}</h4>
                                    </div>
                                </div>
                                <h4 className="pt-2 text-lg font-bold">Shipped Date: {orders.shippedDate}</h4>
                                <h4 className="text-lg font-bold">Order Date: {orders.orderDate}</h4>
                            </div>
                        </a>
                    </>

                )}
            </div>
        </>)
    }

    return (
        <>
            {props.auth.user.isAdmin ? (<AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                {console.log(props)}
                <Head title="Dashboard" />

                <div className="py-12 flex place-content-center">
                    {adminDash()}
                </div>

            </AuthenticatedLayout>) : (window.location.href = "/")}
        </>
    );
}

