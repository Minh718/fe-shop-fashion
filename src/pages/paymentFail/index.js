import React from 'react'

export default function PaymentFail() {
    return (
        <div className="flex items-center justify-center h-[80vh] bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-12 max-w-md w-full text-center">
                <div className="flex justify-center items-center mb-6">
                    <div className="bg-red-100 p-4 rounded-full">
                        <svg
                            className="w-12 h-12 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Failed</h2>
                <p className="text-gray-600 mb-6">
                    We couldn't process your payment. Please try again or use a different payment method.
                </p>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                >
                    Retry Order
                </button>
            </div>
        </div>

    )
}
