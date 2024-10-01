import { ErrorMessage } from "formik";
import React from "react";
const InputField = React.forwardRef(
    ({ value, field, meta, form, ...props }, ref) => {
        return (
            <div className="flex flex-col mb-2 flex-grow">
                <label className="capitalize" htmlFor={field.name}>{props.label}</label>
                <input {...field} {...props} ref={ref} className="border p-2" />
                <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-600"
                />
            </div>
        );
    }
);
export default InputField;