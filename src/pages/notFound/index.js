import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-100">
            <h1 className="text-9xl font-bold text-gray-800">404</h1>
            <h2 className="mt-4 text-3xl font-semibold text-gray-700">Page Not Found</h2>
            <p className="mt-2 text-gray-600">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
                Go back home
            </Link>
        </div>
    );
};

export default NotFound;
