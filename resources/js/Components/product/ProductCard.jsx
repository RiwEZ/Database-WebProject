import React from "react"

export default function ProductCard({product, onClick}) {
    return (
        <>
            <div
                className="transition ease-in-out p-6 bg-white h-full hover:scale-110 cursor-pointer flex flex-col space-y-7 justify-between"
                onClick={() => onClick(product)}
            >
                <div>
                    {/* picture here */}
                    <div className="flex justify-between">
                        <h4 className="text-2xl font-bold mr-0.5">{product.productName} </h4>
                        <div className="bg-black h-min">
                            <h4 className="text-white font-bold text-xl p-1">{product.productScale}</h4>
                        </div>
                    </div>
                    <h4 className="pt-2 text-xl font-bold">{product.productLine}</h4>
                </div>
                <div>
                    <h5 className="text-xl font-bold">In Stock: {product.quantityInStock}</h5>
                    <h5 className="text-2xl font-bold">Price {product.MSRP}$</h5>
                </div>
            </div>
        </>
    )
}
