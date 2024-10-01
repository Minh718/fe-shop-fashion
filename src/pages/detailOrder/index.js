import React, { useEffect } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import convertMoney from "../../utils/convertMoney";
import Breadcrumbsv from "../../common/breadcrumbsv/Breadcrumbsv";
import { OrderStatusArr } from "../../enums/enum";
import Loading from "../../common/loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailOrder } from "../../api/orderService";
import { Divider } from "@mui/material";
const links = {
    'Home': '/',
    'Orders': '/orders',
    'Product Order': '#'

}
const OrderDetailPage = () => {
    const [orderData, setOrderData] = React.useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    useEffect(() => {
        (async () => {
            try {
                const res = await getDetailOrder(id);
                console.log(res)
                setOrderData(res);
            }
            catch (e) {
                navigate("/404")
            }
        })()
    }, []);

    // if (orderData === null) {
    //     return <Loading />
    // }
    const renderTrackingStatus = () => {
        const currentIndex = OrderStatusArr.indexOf(orderData.shippingStatus);

        return (
            <div className=" w-full flex items-center justify-between mt-4">
                {OrderStatusArr.map((status, index) => (
                    <div key={status} className="flex flex-col items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentIndex ? "bg-green-500" : "bg-gray-300"
                                }`}
                        >
                            {index < currentIndex && <CheckCircleOutlineIcon className="text-white" />}
                            {index === currentIndex && <AccessTimeIcon className="text-white" />}
                        </div>
                        <p className="mt-2 text-sm font-medium">{status}</p>
                    </div>
                ))}
            </div>

        );
    };

    return (
        <div className="w-[90%] max-w-[1200px] mx-auto px-4 py-8">
            <Breadcrumbsv links={links} />
            <h1 className="text-3xl font-bold mb-8">Order Details</h1>
            {orderData && <div>

                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Order Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p>
                                <strong>Order ID:</strong> {orderData.id}
                            </p>
                            <p>
                                <strong>Total price:</strong> {convertMoney(orderData.totalAmount + orderData.discount)}
                            </p>
                            <p>
                                <strong>Discount:</strong> {convertMoney(orderData.discount)}
                            </p>
                            <Divider />
                            <p>
                                <strong>Payment:</strong> {convertMoney(orderData.totalAmount)}
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>Order Status:</strong> {orderData.orderStatus}
                            </p>
                            <p>
                                <strong>Shipping Status:</strong> {orderData.shippingStatus}
                            </p>
                            <p>
                                <strong>Created Date:</strong> {formatDate(orderData.createdAt)}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-2">Customer Information</h3>
                        <div className="flex items-center mb-2">
                            <PersonIcon className="mr-2" />
                            <span>{orderData.fullName}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <LocalPhoneIcon className="mr-2" />
                            <span>{orderData.phone}</span>
                        </div>
                        <div className="flex items-center">
                            <LocationOnIcon className="mr-2" />
                            <span>{orderData.shippingAddress}</span>
                        </div>
                    </div>
                </div>


                {orderData.payment && <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
                    <p>
                        <strong>Method:</strong> {orderData.payment.paymentMethod}
                    </p>
                    <p>
                        <strong>Status:</strong> {orderData.payment.paymentStatus}
                    </p>
                </div>}

                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Order Products</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Product</th>
                                    <th className="p-2 text-left">Quantity</th>
                                    <th className="p-2 text-left">Price</th>
                                    <th className="p-2 text-left">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderData.orderProducts.map((product) => (
                                    <tr key={product.id} className="border-b">
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded mr-4"
                                                />
                                                <div>
                                                    <p className="font-semibold">{product.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Size: {product.size}, Color: {product.color}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2">{product.quantity}</td>
                                        <td className="p-2">{convertMoney(product.price)}</td>
                                        <td className="p-2">{convertMoney(product.price * product.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Tracking Information</h2>
                    <p>
                        <strong>Tracking Number:</strong> {orderData.trackingNumber}
                    </p>
                    <p>
                        <strong>Status:</strong> {orderData.shippingStatus}
                    </p>
                    {renderTrackingStatus()}
                </div>
            </div>}

        </div>
    );
};

export default OrderDetailPage;