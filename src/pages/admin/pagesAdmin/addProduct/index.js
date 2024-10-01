import { Switch } from "@mui/material";
import { FastField, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { addProduct } from "../../../../api/productSerivce";
import Breadcrumbsv from "../../../../common/breadcrumbsv/Breadcrumbsv";
import InputField from "../../../../common/inputField/InputField";
import SelectField from "../../../../common/selectField/SelectField";
import TextAreaField from "../../../../common/textAreaField/TextAreaField";
import { notifyError, notifySuccess } from "../../../../common/toastNotify/toastNotify";
import FileInput from "./components/FileInput";
import MultiFileInput from "./components/MultiFileInput";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: "Áo",
            subCategories: [
                { id: 1, name: "Áo thun" },
                { id: 2, name: "Áo sơ mi" },
            ],
        },
        {
            id: 2,
            name: "Quần",
            subCategories: [
                { id: 3, name: "Quần jean" },
                { id: 4, name: "Quần kaki" },
            ],
        },
    ]);

    const [brands, setBrands] = useState([
        { id: 1, name: "Adidas" },
        { id: 2, name: "Nike" },
        { id: 3, name: "Puma" },
    ]);

    const links = {
        Home: "/admin/dashboard",
        Products: "/admin/products",
        "Add product": "#",
    };
    const appendFormData = (formData, data, parentKey = '') => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const fullKey = parentKey ? `${parentKey}[${key}]` : key;
                const value = data[key];

                if (value instanceof FileList) {
                    // If it's a FileList (for multiple files), append each file
                    for (let i = 0; i < value.length; i++) {
                        formData.append(fullKey, value[i]);
                    }
                } else if (value instanceof Object && !(value instanceof File)) {
                    // Recursively append nested objects
                    appendFormData(formData, value, fullKey);
                } else {
                    // Append scalar values
                    formData.append(fullKey, value);
                }
            }
        }
    };
    return (
        <div className="container-register">
            <Breadcrumbsv links={links} />

            <Formik
                initialValues={{
                    name: "",
                    price: "",
                    percent: "",
                    subCate_id: "",
                    brand_id: "",
                    status: false,
                    file: null,
                    description: "",
                    model: "",
                    material: "",
                    origin: "",
                    warranty: "",
                    madeIn: "",
                    files: [],
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required("Product name is required"),
                    price: Yup.number().required("Price is required").typeError("Price must be a number"),
                    percent: Yup.number().required("Discount percent is required").typeError("Discount percent must be a number"),
                    subCate_id: Yup.number().required("Subcategory is required").typeError("Subcategory must be a number"),
                    brand_id: Yup.number().required("Brand is required").typeError("Brand must be a number"),
                    file: Yup.mixed().required("Main product image is required"),
                    description: Yup.string().required("Product description is required"),
                    model: Yup.string().required("Model is required"),
                    material: Yup.string().required("Material is required"),
                    origin: Yup.string().required("Origin is required"),
                    warranty: Yup.string().required("Warranty information is required"),
                    madeIn: Yup.string().required("Country of manufacture is required"),
                })}
                onSubmit={async (values) => {
                    const formData = new FormData();
                    appendFormData(formData, values);
                    try {
                        const data = await addProduct(formData);
                        notifySuccess(data.message);
                        navigate("/admin/product/" + data.result.id);
                    } catch (err) {
                        notifyError(err.response.data.message)
                    }
                }}
            >
                {({ handleSubmit, setFieldValue }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="flex justify-between">
                            <h1 className="font-bold text-[30px]">Add product</h1>
                            <button type="submit">Submit</button>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-grow min-w-[45%]">
                                <FastField name="name">
                                    {(props) => (
                                        <InputField
                                            type="text"
                                            {...props}
                                            placeholder="Product name"
                                            label="Name"
                                        />
                                    )}
                                </FastField>

                                <div className="flex gap-2">
                                    <FastField name="price">
                                        {(props) => (
                                            <InputField
                                                type="number"
                                                {...props}
                                                placeholder="e.g, 50000"
                                                label="Price"
                                            />
                                        )}
                                    </FastField>

                                    <FastField name="percent">
                                        {(props) => (
                                            <InputField
                                                type="number"
                                                {...props}
                                                placeholder="e.g, 32"
                                                label="Percent"
                                            />
                                        )}
                                    </FastField>
                                </div>

                                <div className="flex gap-2 w-full">
                                    <FastField name="subCate_id">
                                        {(props) => (
                                            <SelectField {...props} label="Subcategory">
                                                <option value="">Select subcategory</option>
                                                {categories.map((category) =>
                                                    category.subCategories.map((subCategory) => (
                                                        <option key={subCategory.id} value={subCategory.id}>
                                                            {subCategory.name}
                                                        </option>
                                                    ))
                                                )}
                                            </SelectField>
                                        )}
                                    </FastField>

                                    <FastField name="brand_id">
                                        {(props) => (
                                            <SelectField {...props} label="Brand">
                                                <option value="">Select brand</option>
                                                {brands.map((brand) => (
                                                    <option key={brand.id} value={brand.id}>
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </SelectField>
                                        )}
                                    </FastField>
                                </div>
                                <div className="flex gap-2 w-full">

                                    <FastField name="status">
                                        {({ field }) => (
                                            <div className="flex flex-col mb-2 flex-grow">
                                                <label className="capitalize" htmlFor={field.name}>Status</label>
                                                <Switch defaultChecked={false} onChange={(e) => {
                                                    setFieldValue("status", e.target.checked)
                                                }} />
                                            </div>
                                        )}
                                    </FastField>
                                    <FastField name="madeIn">
                                        {(props) => (
                                            <InputField
                                                type="text"
                                                {...props}
                                                label="Made In"
                                            />
                                        )}
                                    </FastField>

                                </div>

                                <FastField name="file">
                                    {({ field }) => (
                                        <FileInput
                                            field={field}
                                            label="Main product image"
                                        />
                                    )}
                                </FastField>
                            </div>

                            <div className="flex-grow">
                                <FastField name="description">
                                    {(props) => (
                                        <TextAreaField
                                            {...props}
                                            placeholder="Description product"
                                            label="Description"
                                        />
                                    )}
                                </FastField>

                                <div className="flex gap-2">
                                    <FastField name="model">
                                        {(props) => (
                                            <InputField
                                                type="text"
                                                {...props}
                                                placeholder="e.g, 2019"
                                                label="Model"
                                            />
                                        )}
                                    </FastField>

                                    <FastField name="material">
                                        {(props) => (
                                            <InputField
                                                type="text"
                                                {...props}
                                                placeholder="e.g, cotton"
                                                label="Material"
                                            />
                                        )}
                                    </FastField>
                                </div>

                                <div className="flex gap-2">
                                    <FastField name="origin">
                                        {(props) => (
                                            <InputField
                                                type="text"
                                                {...props}
                                                placeholder="e.g, China"
                                                label="Origin"
                                            />
                                        )}
                                    </FastField>

                                    <FastField name="warranty">
                                        {(props) => (
                                            <InputField
                                                type="text"
                                                {...props}
                                                placeholder="e.g, 12 months"
                                                label="Warranty"
                                            />
                                        )}
                                    </FastField>
                                </div>

                                <FastField name="files">
                                    {({ field }) => (
                                        <MultiFileInput
                                            field={field}
                                        />
                                    )}
                                </FastField>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    );
}
