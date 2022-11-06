import React from 'react';

export default function SearchBar({onChange}) {
    return (
    <>
        <div className="py-4 flex items-center justify-center">
            <input
                type="text"
                className="rounded-full border-2 border-black w-2/3 px-5 py-2"
                onChange={onChange}
                placeholder="Search by the model name ..."
            />
        </div>

    </>
    )
}
