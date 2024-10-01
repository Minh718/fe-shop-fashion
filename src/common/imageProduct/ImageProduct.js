import React from 'react'

export default function ImageProduct({ product }) {
    return (
        <div className=' w-[200px] h-[200px]'>
            <img src={product.image} alt={product.name} className='w-full h-full object-cover ' />

        </div>
    )
}
