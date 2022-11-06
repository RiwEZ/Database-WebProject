import React, { useEffect, useState } from "react";

import ProductViewNavBar from "../nav/ProductViewNavBar";
import ProductModal from "./ProductModal";
import ProductPaginate from "./ProductPaginate";

import '@/../css/product.css';

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

// chunk size must be > 0, if not we only return empty array
function split_to_chunks(items, chunk_size) {
    if (chunk_size <= 0) {
        return [];
    }
    let result = [];
    for (let i = 0; i < items.length; i += chunk_size) {
        result.push(items.slice(i, i + chunk_size));
    }
    return result;
}

export default function ProductViewer({auth, products, showNavbarMenu}) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(99999);
    const [type_filters, setType_filters] = useState(type_filter);
    const [usePrice, setusePrice] = useState(price_filter);
    const [searchValue, setSearchValue] = useState("");
    const [modal, setModal] = useState();

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

    function handleCardClick(product) {
        setModal(<ProductModal product={product} handleClose={handleCloseModal}/>)
    }

    function handleCloseModal() {
        setModal();
    }

    const chunk_size = 15;
    const [productsChunk, setProductsChunk] = useState(split_to_chunks(products, chunk_size));
    useEffect(() => {
        let products_filterd = products
            .filter(p =>
                p.productName
                .toLowerCase()
                .includes(searchValue.toLowerCase()))
            .filter(p => checkFilter(p));

        setProductsChunk(split_to_chunks(products_filterd, chunk_size));
    }, [minPrice, maxPrice, searchValue, type_filters]);

    return (
        <>
        <div
            className="mx-auto sticky top-0 bg-white z-10 border-b-4 border-black"
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
        <div className="bg-black lg:flex px-8 justify-items-center">
            <div className="pt-10 lg:p-0 lg:w-1/3 lg:sticky lg:top-16" aria-label="Sidebar">
                {/* <div className="   bottom-0 left-0   bg-white m-auto lg:m-10 p-4 w-1/4 min-w-max h-80 "> */}
                <div className="overflow-y-auto py-4 px-6 bg-white lg:m-10 lg:w-80">
                    <h3 className="text-2xl font-bold">FILTER</h3>
                    <h4 className="font-bold">PRICE RANGE</h4>
                        <div className="flex flex-row justify-evenly">
                            <input
                                className="border-2 border-black px-2 py-1 text-slate-600 relative text-sm
                                    border-1 shadow outline-none focus:outline-none focus:ring w-full"
                                placeholder="min"
                                type="number"
                                min="0"
                                onChange={e => setMinPrice(parseFloat(e.target.value))}>
                            </input>
                            <span className="px-1">   -   </span>
                            <input
                                className="border-2 border-black px-2 py-1 text-slate-600 relative text-sm border-1
                                    shadow outline-none focus:outline-none focus:ring w-full"
                                placeholder="max"
                                type="number"
                                min="0"
                                onChange={e => setMaxPrice(parseFloat(e.target.value))}>
                            </input>
                        </div>
                    <div>
                        <h4 className="font-bold">PRODUCT TYPE</h4>
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
            <ProductPaginate productsChunk={productsChunk} handleCardClick={handleCardClick}></ProductPaginate>
            {modal}
        </div>
        </>
    )
}
