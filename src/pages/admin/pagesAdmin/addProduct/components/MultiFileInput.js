import React, { useState } from 'react';
import { FastField, useFormikContext } from 'formik';
import ImagePreview from './ImagePreview';

const MultiFileInput = ({ field }) => {
    const { setFieldValue } = useFormikContext();
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.currentTarget.files);

        // Update Formik's field value
        setFieldValue(field.name, files);

        // Log files for debugging
        console.log(files);

        // Create preview URLs and set them in state
        const previews = files.map(file => {
            if (file) {
                const reader = new FileReader();
                return new Promise((resolve) => {
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            }
            return Promise.resolve(null);
        });

        Promise.all(previews).then(results => {
            setImagePreviews(results);
        });
    };

    return (
        <div className='flex flex-col mb-2'>
            <label htmlFor={field.name} className="capitalize">Detail images</label>

            <input
                type="file"
                id={field.name}
                accept="image/*"

                multiple // Allows multiple file selection
                onChange={handleFileChange}
                className="border p-2"
            />

            {/* Display image previews */}
            <div className="mt-2 flex gap-2 flex-wrap">
                {imagePreviews.map((preview, index) => (
                    <ImagePreview
                        key={index}
                        imagePreview={preview}
                    />
                ))}
            </div>
        </div>
    );
};

export default MultiFileInput;
