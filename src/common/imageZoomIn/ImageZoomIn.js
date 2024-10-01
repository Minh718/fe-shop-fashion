import React from 'react'

export default function ImageZoomIn({ setIsZoomed, imagePreview }) {
    return (
        <div
            onClick={() => setIsZoomed(false)} // Close zoom on click
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 cursor-zoom-out"
        >
            <img
                src={imagePreview}
                alt="Zoomed Preview"
                className="max-w-[90%] max-h-[90%] transition-transform duration-300 ease-in-out"
            />
        </div>
    )
}
