import React, { useState } from "react";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

const VoucherPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [voucherCode, setVoucherCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");
    const [startDate, setStartDate] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [maxDiscount, setMaxDiscount] = useState("");
    const [minValue, setMinValue] = useState("");
    const [errors, setErrors] = useState({});

    const dummyVouchers = [
        {
            id: 1,
            code: "SUMMER2023",
            type: "PERCENT",
            discount: 20,
            minPrice: 50,
            maxDiscount: 100,
            description: "Summer sale discount",
            startDate: "2023-06-01",
            forNewUser: true,
            endDate: "2023-08-31",
            createdAt: "2023-05-15",
            updatedAt: "2023-05-15",
            active: true
        },
        {
            id: 2,
            code: "FALL50OFF",
            type: "PERCENT",
            discount: 50,
            minPrice: 100,
            maxDiscount: 200,
            description: "Fall season discount",
            startDate: "2023-09-01",
            forNewUser: false,
            endDate: "2023-09-30",
            createdAt: "2023-08-15",
            updatedAt: "2023-08-15",
            active: false
        },
        {
            id: 3,
            code: "WINTER10",
            type: "PERCENT",
            discount: 10,
            minPrice: 25,
            maxDiscount: 50,
            description: "Winter holiday discount",
            startDate: "2023-12-01",
            forNewUser: true,
            endDate: "2023-12-31",
            createdAt: "2023-11-15",
            updatedAt: "2023-11-15",
            active: true
        },
    ];

    const validateForm = () => {
        let newErrors = {};
        if (!voucherCode) newErrors.voucherCode = "Voucher code is required";
        if (!discountAmount) newErrors.discountAmount = "Discount amount is required";
        else if (isNaN(discountAmount) || Number(discountAmount) <= 0) newErrors.discountAmount = "Discount amount must be a positive number";
        if (!startDate) newErrors.startDate = "Start date is required";
        if (!expirationDate) newErrors.expirationDate = "Expiration date is required";
        if (!maxDiscount) newErrors.maxDiscount = "Max discount is required";
        else if (isNaN(maxDiscount) || Number(maxDiscount) <= 0) newErrors.maxDiscount = "Max discount must be a positive number";
        if (!minValue) newErrors.minValue = "Min value is required";
        else if (isNaN(minValue) || Number(minValue) < 0) newErrors.minValue = "Min value must be a non-negative number";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Voucher created:", { voucherCode, discountAmount, startDate, expirationDate, maxDiscount, minValue });
            setShowForm(false);
            resetForm();
        }
    };

    const resetForm = () => {
        setVoucherCode("");
        setDiscountAmount("");
        setStartDate("");
        setExpirationDate("");
        setMaxDiscount("");
        setMinValue("");
        setErrors({});
    };

    const handleEdit = (id) => {
        console.log("Edit voucher with id:", id);
        // Implement edit functionality
    };

    const handleDelete = (id) => {
        console.log("Delete voucher with id:", id);
        // Implement delete functionality
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Voucher Management</h1>
            <button
                onClick={() => setShowForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-6 transition duration-300 ease-in-out flex items-center"
                aria-label="Create Voucher"
            >
                <FiPlus className="mr-2" /> Create Voucher
            </button>

            {showForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Voucher</h3>
                            <form onSubmit={handleSubmit} className="mt-2 text-left">
                                <div className="mb-4">
                                    <label htmlFor="voucherCode" className="block text-sm font-medium text-gray-700">Voucher Code</label>
                                    <input
                                        type="text"
                                        id="voucherCode"
                                        value={voucherCode}
                                        onChange={(e) => setVoucherCode(e.target.value)}
                                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.voucherCode ? 'border-red-500' : ''}`}
                                        aria-invalid={errors.voucherCode ? "true" : "false"}
                                    />
                                    {errors.voucherCode && <p className="mt-1 text-sm text-red-500">{errors.voucherCode}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-700">Discount Amount</label>
                                    <input
                                        type="number"
                                        id="discountAmount"
                                        value={discountAmount}
                                        onChange={(e) => setDiscountAmount(e.target.value)}
                                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.discountAmount ? 'border-red-500' : ''}`}
                                        aria-invalid={errors.discountAmount ? "true" : "false"}
                                    />
                                    {errors.discountAmount && <p className="mt-1 text-sm text-red-500">{errors.discountAmount}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.startDate ? 'border-red-500' : ''}`}
                                        aria-invalid={errors.startDate ? "true" : "false"}
                                    />
                                    {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
                                    <input
                                        type="date"
                                        id="expirationDate"
                                        value={expirationDate}
                                        onChange={(e) => setExpirationDate(e.target.value)}
                                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.expirationDate ? 'border-red-500' : ''}`}
                                        aria-invalid={errors.expirationDate ? "true" : "false"}
                                    />
                                    {errors.expirationDate && <p className="mt-1 text-sm text-red-500">{errors.expirationDate}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="maxDiscount" className="block text-sm font-medium text-gray-700">Max Discount</label>
                                    <input
                                        type="number"
                                        id="maxDiscount"
                                        value={maxDiscount}
                                        onChange={(e) => setMaxDiscount(e.target.value)}
                                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.maxDiscount ? 'border-red-500' : ''}`}
                                        aria-invalid={errors.maxDiscount ? "true" : "false"}
                                    />
                                    {errors.maxDiscount && <p className="mt-1 text-sm text-red-500">{errors.maxDiscount}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="minValue" className="block text-sm font-medium text-gray-700">Min Value</label>
                                    <input
                                        type="number"
                                        id="minValue"
                                        value={minValue}
                                        onChange={(e) => setMinValue(e.target.value)}
                                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.minValue ? 'border-red-500' : ''}`}
                                        aria-invalid={errors.minValue ? "true" : "false"}
                                    />
                                    {errors.minValue && <p className="mt-1 text-sm text-red-500">{errors.minValue}</p>}
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">Voucher Code</th>
                            <th scope="col" className="py-3 px-6">Type</th>
                            <th scope="col" className="py-3 px-6">Discount</th>
                            <th scope="col" className="py-3 px-6">Min Price</th>
                            <th scope="col" className="py-3 px-6">Max Discount</th>
                            <th scope="col" className="py-3 px-6">Description</th>
                            <th scope="col" className="py-3 px-6">Start Date</th>
                            <th scope="col" className="py-3 px-6">End Date</th>
                            <th scope="col" className="py-3 px-6">For New User</th>
                            <th scope="col" className="py-3 px-6">Status</th>
                            <th scope="col" className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyVouchers.map((voucher) => (
                            <tr key={voucher.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {voucher.code}
                                </td>
                                <td className="py-4 px-6">{voucher.type}</td>
                                <td className="py-4 px-6">{voucher.discount}%</td>
                                <td className="py-4 px-6">${voucher.minPrice}</td>
                                <td className="py-4 px-6">${voucher.maxDiscount}</td>
                                <td className="py-4 px-6">{voucher.description}</td>
                                <td className="py-4 px-6">{voucher.startDate}</td>
                                <td className="py-4 px-6">{voucher.endDate}</td>
                                <td className="py-4 px-6">{voucher.forNewUser ? "Yes" : "No"}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${voucher.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {voucher.active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <button
                                        onClick={() => handleEdit(voucher.id)}
                                        className="text-blue-600 hover:text-blue-900 mr-2"
                                        aria-label="Edit Voucher"
                                    >
                                        <FiEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(voucher.id)}
                                        className="text-red-600 hover:text-red-900"
                                        aria-label="Delete Voucher"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VoucherPage;
