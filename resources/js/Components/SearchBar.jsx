import React from 'react';

export default function SearchBar({onChange}) {
    return (
    <>
        <div className="py-4 flex items-center justify-center">
            <input
                type="text"
                className="rounded-lg w-2/3"
                onChange={onChange}
                placeholder="Search by the model name ..."
            />
        </div>

    </>
    )
}
