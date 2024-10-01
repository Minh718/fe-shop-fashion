import { ErrorMessage } from "formik";
import React from "react";
export default function SelectField({ field, value, meta, form, ...props }) {
    return (
        <div className="flex flex-col mb-2 flex-grow">
            <label htmlFor={field.name}>{props.label}</label>
            <select {...field} {...props} className="border p-2" />
            <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-600"

            />
        </div>
    );
}