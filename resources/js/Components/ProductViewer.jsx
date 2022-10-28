import React, { useEffect, useState } from "react";

const type_filter = [
    {name: "Classic Cars", selected: false},
    {name: "Motorcycles", selected: false},
    {name: "Planes", selected: false},
    {name: "Ships", selected: false},
    {name: "Trains", selected: false},
    {name: "Trucks and Buses", selected: false},
    {name: "Vintage Cars", selected: false},
];

export default function ProductViewer(props) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(99999);
    const [filters, setFilters] = useState(type_filter);
    const [products, setProducts] = useState(props.products);

    function handleFilterChange(filter) {
        setFilters(filters.map(f => {
            if (f.name === filter.name) {
               return filter;
            }
            else {
                return f;
            }
        }));
    }

    useEffect(() => {
        setProducts(props.products.filter(p => checkFilter(p)));
    }, [filters, minPrice, maxPrice])

    function checkFilter(product) {
        let filter_selected = false;
        for (let i = 0; i < filters.length; i++) {
            if (filters[i].selected) {
                filter_selected = true;
                break;
            }
        }

        let price = product.buyPrice;
        if (!filter_selected && price >= minPrice && price <= maxPrice) {
            return true;
        }
        if (filters.find(f => f.name === product.productLine && f.selected)
            && price >= minPrice && price <= maxPrice) {
            return true;
        }
        return false;
    }

    return (
        <>
        <div className="bg-black mt-6 flex">
            <div className="bg-white m-10 p-4">
                <h3 className="text-2xl font-bold">Filter</h3>
                <div>
                    <h4>PRICE RANGE</h4>
                    <input type="number" value={minPrice} onChange={e => setMinPrice(parseFloat(e.target.value))}></input>
                    <input type="number" value={maxPrice} onChange={e => setMaxPrice(parseFloat(e.target.value))}></input>
                </div>
                <div>
                    <h4>PRODUCT LINE</h4>
                    <ul>
                        {filters && filters.map(filter =>
                            <li>
                                <input
                                    type="checkbox"
                                    checked={filter.selected}
                                    onChange={e => {
                                        handleFilterChange({
                                            ...filter,
                                            selected: e.target.checked
                                        })
                                    }}
                                ></input>
                                <label className="ml-2">{filter.name.toUpperCase()}</label>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-10 pr-24">
                {products && products.map(p =>
                    <div className="p-4 bg-white" key={p.productCode}>
                        <h4 className="text-2xl">{p.productName}</h4>
                        <p>{p.productDescription}</p>
                        <h5 className="font-bold">Scale: {p.productScale}</h5>
                        <h5 className="font-bold">In Stock: {p.quantityInStock}</h5>
                        <div className="flex justify-between">
                            <h5 className="font-bold">Price {p.buyPrice}$</h5>
                            <button className="border border-black">ADD TO CART</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}
