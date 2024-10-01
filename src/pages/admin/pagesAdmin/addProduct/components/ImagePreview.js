import React, { useState } from 'react'
import ImageZoomIn from '../../../../../common/imageZoomIn/ImageZoomIn';
import ImageProduct from '../../../../../common/imageProduct/ImageProduct';

export default function ImagePreview({ imagePreview }) {
    const [isZoomed, setIsZoomed] = useState(false); // Track zoom state

    return (isZoomed ? <ImageZoomIn imagePreview={imagePreview} setIsZoomed={setIsZoomed} /> : (
        <div onClick={() => setIsZoomed(true)} className="cursor-pointer">

            <ImageProduct
                product={{ image: imagePreview, name: "Preview" }}
            // Toggle zoom on click
            />
        </div>
    ))
}
