import React from 'react'

export default function PaymentSuccess() {
    return (
        <div className="flex items-center justify-center h-[80vh] bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-12 max-w-md w-full text-center">
                <div className="flex justify-center items-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <svg
                            className="w-12 h-12 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2l4-4M7 12l2 2l-2-2M7 12l4-4l4 4m0 0l-4-4l4-4l-4 4l-4 4"
                            />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">
                    Thank you for your payment. Your transaction has been completed successfully.
                </p>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    )
}
