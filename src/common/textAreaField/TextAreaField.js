import { ErrorMessage } from "formik";
import React from "react";
const TextAreaField = React.forwardRef(
    ({ value, field, meta, form, ...props }, ref) => {
        return (
            <div className="flex flex-col mb-2 flex-grow">
                <label className="capitalize" htmlFor={field.name}>{props.label}</label>
                <textarea {...field} {...props} rows={6} ref={ref} className="border p-2" />
                <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-600"
                />
            </div>
        );
    }
);
export default TextAreaField;