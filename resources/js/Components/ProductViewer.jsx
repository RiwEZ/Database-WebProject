import React, { useEffect, useState } from "react";
import { Link } from '@inertiajs/inertia-react';

import ProductViewNavBar from "./ProductViewNavBar";

import '../../css/product.css';

const type_filter = [
    {name: "Classic Cars", selected: false},
    {name: "Motorcycles", selected: false},
    {name: "Planes", selected: false},
    {name: "Ships", selected: false},
    {name: "Trains", selected: false},
    {name: "Trucks and Buses", selected: false},
    {name: "Vintage Cars", selected: false},
];   // เอาไว้แค่ ประเภทรถ

const price_filter = [{name: "By PRICE", selected: false},
// {name: "scale", selected: false},
];  // ใส่่อย่างอื่นเพิ่มได้อีก ,scale ? year

export default function ProductViewer({auth, products, showNavbarMenu}) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(99999);
    const [type_filters, setType_filters] = useState(type_filter);
    const [usePrice, setusePrice] = useState(price_filter);
    const [searchValue, setSearchValue] = useState("");

    function handleFilter(filter) {
        setusePrice(usePrice.map(f => {
            if (f.name === filter.name) {
               return filter;
            }
            else {
                return f;
            }
        }
        ));
    }
    function handleFiltertype(type) {
        setType_filters(type_filters.map(t => {
            if (t.name === type.name) {
               return type;
            }
            else {
                return t;
            }
        }
        ));
    }


    function checkFilter(product) {
        let type_selected = false;
        for (let i = 0; i < type_filters.length; i++) {
            if (type_filters[i].selected) {    
                type_selected = true;
                break;
            }
        }
         
        let price = product.buyPrice;
        // if( !usePrice[0].selected){
        //     if (  !type_selected   ) {
        //         return true;
        //     }
        //     if (type_filters.find(f => f.name === product.productLine && f.selected) && (price >= minPrice ||  isNaN(minPrice)  )  && (price <= maxPrice ||  isNaN(maxPrice) ) ) {
        //     return true;
        //     }
        // }
        // if( usePrice[0].selected){
            if (  !type_selected && (price >= minPrice || isNaN(minPrice) )  && (price <= maxPrice ||  isNaN(maxPrice))   ) {
                return true;
            }
            if (type_filters.find(f => f.name === product.productLine && f.selected) && (price >= minPrice || isNaN(minPrice) )  && (price <= maxPrice ||  isNaN(maxPrice))) {
                return true;
                }
        // }
         
        return false;
    }
    

    function catalog_icon(productLine) {
        
        switch(productLine) {
            case 'Classic Cars':
              return '🚗';
            case 'Motorcycles':
              return '🏍️';
            case 'Planes':
              return '✈️';
            case 'Ships':
              return '🚤';
            case 'Trains':
              return '🚂';
            case 'Trucks and Buses':
              return '🚌';
            case 'Vintage Cars':
            return '🛺';
            default:
              return 'foo';
          }
     
        return "";
    }
    
    function range_PRICE() {
        
        // if (usePrice[0].selected) {
            return (<><div className="py-4">    
                <h4>PRICE RANGE</h4>            
                <div className="flex flex-row justify-evenly">
                <input className="px-2 py-1 text-slate-600 relative text-sm border-1 shadow outline-none focus:outline-none focus:ring w-full" placeholder="min"  type="number" min="0"  onChange={e => setMinPrice(parseFloat(e.target.value))}></input>
                <>   :   </>      
                <input className="px-2 py-1 text-slate-600 relative text-sm border-1 shadow outline-none focus:outline-none focus:ring w-full"  placeholder="max" type="number" min="0"   onChange={e => setMaxPrice(parseFloat(e.target.value))}></input>
                    
                </div>           
                </div>
            </>)
        // }
     
        // return "";
    }
 
    return (
        <>
        <div
            className="mx-auto sticky top-0 bg-white z-50 border-b-4 border-black"
        >
            <div className="max-w-6xl m-auto">
                <ProductViewNavBar
                    auth={auth}
                    searchOnChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    showNavbarMenu={showNavbarMenu}
                />
            </div>
        </div>
        <div className="bg-black flex px-8 flex-col lg:flex-row justify-items-center">
        <div class="w-1/4 h-screen sticky top-24" aria-label="Sidebar">
            {/* <div className="   bottom-0 left-0   bg-white m-auto lg:m-10 p-4 w-1/4 min-w-max h-80 "> */}
            <div class="overflow-y-auto py-4 px-6 bg-white m-auto lg:m-10">
                <h3 className="text-2xl font-bold">FILTER</h3>
                {/* <div>
                {usePrice && usePrice.map(P =>
                            <li>
                                <input
                                    type="checkbox"
                                    checked={P.selected}
                                    onChange={e => {handleFilter({...P,selected: e.target.checked})}}
                                ></input>
                                <label className="ml-2">{P.name.toUpperCase()}</label>
                         */}
                                {range_PRICE()}
                            {/* </li>
                        )}
                </div> */}
                <div>
                    <h4>PRODUCT TYPE</h4>
                    <ul>
                        {type_filters && type_filters.map((typefilter ,  i) =>
                            <li key={i} >
                                <input
                                    type="checkbox"
                                    checked={typefilter.selected}
                                    onChange={e => { handleFiltertype({ ...typefilter,selected: e.target.checked})}}
                                ></input>
                                <label className="ml-2">{typefilter.name.toUpperCase()}</label>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            </div>
            <div className="w-2/3 grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 my-10">
                {products &&  products.filter(p => p.productName.toLowerCase().includes(searchValue.toLowerCase()))
                    .filter(p => checkFilter(p))
                    .map(p =>

                    <div className="p-4 bg-white h-min" key={p.productCode}>
                        <h4 className="text-2xl">{p.productName} </h4>
                        <h4>{p.productLine}: {catalog_icon(p.productLine)}</h4>
                         
                        {/* <p >{p.productDescription}</p>   */}
                        <abbr title="" data={p.productDescription}>Details</abbr>
                        <h5 className="font-bold">Scale: {p.productScale}</h5>
                        <h5 className="font-bold">In Stock: {p.quantityInStock}</h5>
                        <div className="flex justify-between">
                            <h5 className="font-bold">Price {p.buyPrice}$</h5>
                            <Link href={`/add-to-cart/${p.productCode}`} className="btn border border-black">ADD TO CART</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}
