import React from "react"
import { useEffect } from "react";
import { useState } from "react"
import ProductCard from "./ProductCard"

// this is just a simple paginate view, with no constraint for selection (could be a problem but I'm lazy)
export default function ProductPaginate({productsChunk, handleCardClick}) {
    const [currChunk, setCurrChunk] = useState(0);

    useEffect(() => {
        setCurrChunk(0);
    }, [productsChunk]);

    function buttonStyle(idx) {
        let base = "py-2 px-3 rounded-lg hover:bg-zinc-500";
        if (idx == currChunk) {
            return base + " bg-zinc-700";
        }
        return base;
    }

    return (
        <>
            <div className="my-10">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 mx-10 mb-10">
                    {productsChunk[currChunk] && productsChunk[currChunk].map(p =>
                        <ProductCard product={p} onClick={handleCardClick} key={p.productCode}/>
                    )}
                </div>
                <div className="text-white text-center text-1xl md:text-2xl md:space-x-5">
                    {productsChunk.map((_, idx) =>
                        <button
                            key={idx}
                            onClick={() => setCurrChunk(idx)}
                            className={buttonStyle(idx)}
                        >
                            {idx+1}
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
