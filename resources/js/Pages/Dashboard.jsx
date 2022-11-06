import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

export default function Dashboard(props) {

    let orders = props.orders;
    let auth = props.auth;

    function adminDash() {
        return (<>

            <div className="w-5/6 grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-10 my-10 mx-8 ">
                {orders.map(o =>
                    <div className={"transition ease-in-out p-6 bg-white h-min hover:scale-110 cursor-pointer" + ( o.status === 'Shipped' ? " bg-green-500" : " bg-red-600")} key={o.orderNumber}
                        onClick={() => handleCardClick(o)} >
    
                            <div className="flex justify-between">
                                <h4 className="text-l font-bold mr-0.5">orderNumber: {o.orderNumber} </h4>
                                <div className="bg-black h-min">
                                    <h4 className="text-white font-bold text-xl p-1">Status: {o.status}</h4>

                                </div>
                            </div>
                            <h4 className="pt-2 text-xl font-bold">shippedDate: {o.shippedDate}</h4>
                            <h4 className="text-xl font-bold">orderDate: {o.orderDate}</h4>


                        </div>
                )}
            </div>
        </>)
    }

    if (auth.user.isAdmin) {
        return (
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
                <Head title="Dashboard" />
                {/* {console.log(orders)}
            {console.log(props.auth.user.isAdmin)} */}


            //TODO
                
                <div className="py-12 flex place-content-center">
                        {adminDash()}
                        
                </div>
                
            </AuthenticatedLayout>
        );
    } else {
        window.location.href = "http://localhost/";
    }

}
