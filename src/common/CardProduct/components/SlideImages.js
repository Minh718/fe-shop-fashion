import React from 'react'
import { Fade } from 'react-slideshow-image'

export default function SlideImages({ images }) {
    return (
        <div className="w-full">
            <Fade>
                {images?.map((url, index) => (
                    <img key={index} className='w-full object-contain object-center' alt='Ảnh sản phẩm' src={url} />
                ))}
            </Fade>
        </div>
    )
}