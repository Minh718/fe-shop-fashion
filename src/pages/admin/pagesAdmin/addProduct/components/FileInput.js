import React, { useState } from 'react';
import { ErrorMessage, FastField, useFormikContext } from 'formik';
import ImagePreview from './ImagePreview';

const FileInput = ({ field, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [imagePreview, setImagePreview] = useState(null);


    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        setFieldValue("file", file);

        // Create a preview URL and set it in state
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result)
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    }

    return (
        <div className='flex flex-col mb-2'>
            <label htmlFor={field.name} className="capitalize">{props.label}</label>
            <input
                type="file"
                id={field.name}
                accept="image/*"

                onChange={handleFileChange}
                className="border p-2"
            />
            <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-600"
            />
            {/* Display image previews */}
            {imagePreview && <ImagePreview imagePreview={imagePreview} />}

        </div>
    );
};

export default FileInput;