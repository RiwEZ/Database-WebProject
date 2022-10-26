import React from 'react';

export default function PrimaryButton({ type = 'submit', className = '', processing, children }) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-8 py-2 bg-black border-4 border-white font-bold text-xl text-white uppercase tracking-widest hover:bg-white hover:text-black active:bg-gray-900 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
