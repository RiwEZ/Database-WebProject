import React from "react";

export default function ProductViewer() {
    return (
        <>
        <div className="bg-black h-screen mt-6 flex">
            <div className="bg-white m-10 p-4">
                <h3 className="text-2xl font-bold">Filter</h3>
                <div>
                    <h4>PRICE RANGE</h4>
                    <input type="number"></input>
                    <input type="number"></input>
                </div>
                <div>
                    <h4>PRODUCT LINE</h4>
                    <input type="checkbox"></input>
                    <label className="ml-2">CLASSIC CARS</label><br />
                    <input type="checkbox"></input>
                    <label className="ml-2">MOTORCYCLES</label><br />
                    <input type="checkbox"></input>
                    <label className="ml-2">PLANES</label><br />
                    <input type="checkbox"></input>
                    <label className="ml-2">SHIPS</label><br />
                    <input type="checkbox"></input>
                    <label className="ml-2">TRAINS</label><br />
                    <input type="checkbox"></input>
                    <label className="ml-2">TRUCKS AND BUSES</label><br />
                    <input type="checkbox"></input>
                    <label className="ml-2">VINTAGE CARS</label><br />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-10 m-10">
                <div className="p-4 bg-white">
                    <h4 className="text-2xl">1969 Ford Falcon</h4>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora libero ipsa velit beatae, enim expedita error tenetur amet provident at dolores veniam eveniet, culpa nisi. Fugiat velit ducimus accusantium dolores.</p>
                    <h5 className="font-bold">Scale: 1:12</h5>
                    <h5 className="font-bold">In Stock: 1024</h5>
                    <div className="flex justify-between">
                        <h5 className="font-bold">Price 83.05$</h5>
                        <button className="border border-black">ADD TO CART</button>
                    </div>
                </div>
                <div className="p-4 bg-white">
                    <h4 className="text-2xl">1969 Ford Falcon</h4>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora libero ipsa velit beatae, enim expedita error tenetur amet provident at dolores veniam eveniet, culpa nisi. Fugiat velit ducimus accusantium dolores.</p>
                </div>
                <div className="p-4 bg-white">
                    <h4 className="text-2xl">1969 Ford Falcon</h4>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora libero ipsa velit beatae, enim expedita error tenetur amet provident at dolores veniam eveniet, culpa nisi. Fugiat velit ducimus accusantium dolores.</p>
                </div>
            </div>
        </div>
        </>
    )
}