import React from 'react'
import Product from '../../../common/CardProduct/Product'

export default function ProductsHomePage({ index, products, name }) {
    return (
        <div className={index % 2 === 0 ? 'p-12 bg-white' : 'p-12 bg-black'}>
            <h1 className={`${index % 2 === 0 ? "text-black" : "text-white"} text-center font-bold  text-[26px] pb-5 uppercase`}>Newest {name}</h1>
            <div className='flex items-center justify-center'>
                <div className='flex w-[90%] max-w-[1100px] justify-between flex-wrap'>
                    {products.map((product, index) => (
                        <Product product={product} key={index} />
                    ))
                    }
                </div>
            </div>
            <div className='flex justify-center mt-5'>
                <button className={`${index % 2 === 0 ? "border-black text-black" : "border-white text-white"}  font-bold p-2 border-2 `}>View more</button>
            </div>
        </div>
    )
}
