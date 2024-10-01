import React, { useEffect, useState } from "react";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../common/loading/Loading";
const SuccessOrderPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { order } = location.state || {};
    useEffect(() => {
        if (!order) {
            navigate('/404');
        }
    }, []);
    if (!order) return <Loading />;
    const getEstimatedDelivery = () => {
        const date = new Date(order.createdAt);
        date.setDate(date.getDate() + 7);
        return date.toDateString();
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isEditing, setIsEditing] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [customerInfo, setCustomerInfo] = useState({
        fullName: order.fullName,
        shippingAddress: order.shippingAddress,
        phone: order.phone,
    });

    const orderDetails = {
        orderNumber: order.trackingNumber,
        items: order.orderProducts,
        shipping: 0,
        discount: order.discount,
        total: order.totalAmount,
        paymentMethod: order.payment.paymentMethod,
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleInfoChange = (e) => {
        setCustomerInfo({ ...customerInfo, [e.target.fullName]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-green-500 text-white px-6 py-4">
                    <div className="flex items-center justify-center">
                        <CheckCircleIcon className="text-4xl mr-2" />
                        <h1 className="text-2xl font-bold">Order Placed Successfully!</h1>
                    </div>
                </div>

                <div className="px-6 py-4">
                    <p className="text-gray-700 text-lg mb-4">
                        Thank you for your order. Your order number is{" "}
                        <span className="font-semibold">{orderDetails.orderNumber}</span>.
                        Estimated delivery date:{" "}
                        <span className="font-semibold">
                            {getEstimatedDelivery()}
                        </span>
                    </p>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                        <div className="border-t border-b py-2">
                            {orderDetails.items.map((item, index) => (
                                <div key={index} className="flex justify-between py-1">
                                    <span>
                                        {item.name}, {item.size}, {item.color} (x{item.quantity})
                                    </span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between py-1">
                                <span>Shipping</span>
                                <span>${orderDetails.shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span>discount</span>
                                <span>${orderDetails.discount.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between font-semibold text-lg mt-2">
                            <span>Total</span>
                            <span>${orderDetails.total.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            Payment Method: {orderDetails.paymentMethod}
                        </p>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">Customer Information</h2>
                            <button
                                onClick={handleEdit}
                                className="text-blue-500 hover:text-blue-700"
                                aria-label={
                                    isEditing
                                        ? "Save customer information"
                                        : "Edit customer information"
                                }
                            >
                                <EditIcon className="text-xl" />
                            </button>
                        </div>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-4">
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={customerInfo.fullName}
                                        onChange={handleInfoChange}
                                        className="border rounded px-3 py-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="shippingAddress"
                                        value={customerInfo.shippingAddress}
                                        onChange={handleInfoChange}
                                        className="border rounded px-3 py-2"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={customerInfo.phone}
                                        onChange={handleInfoChange}
                                        className="border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                                >
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            <div>
                                <p>{customerInfo.fullName}</p>
                                <p>{customerInfo.shippingAddress}</p>
                                <p>{customerInfo.phone}</p>
                            </div>
                        )}
                    </div>

                    {/* <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Order Tracking</h2>
                        <div className="bg-gray-100 p-4 rounded">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">Current Status:</span>
                                <span className="text-green-600 font-semibold">Processing</span>
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-2.5">
                                <div className="bg-green-600 h-2.5 rounded-full w-1/4"></div>
                            </div>
                            <button className="mt-4 flex items-center text-blue-500 hover:text-blue-700">
                                <LocalShippingIcon className="mr-2" /> Track Order in Real-time
                            </button>
                        </div>
                    </div> */}

                    <div className="flex justify-center">
                        <button className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-200 flex items-center">
                            <ShoppingCartIcon className="mr-2" /> Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessOrderPage;
