// src/api/userService.js

import api from "../utils/axiosInterceptor";

import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { handleApiResponse } from "./utilApi";

const addProductToCart = async (data) => {
    await api.post(baseURL + '/cart/addProduct', data);
};
const getAllProductOfCart = async (page) => {
    try {

        const res = await api.get(baseURL + '/cart/allProduct?page=' + page);
        return handleApiResponse(res)
    } catch (e) {
        console.log(e)
    }
};

const removeProductFromCart = async (id) => {
    const res = await api.delete(baseURL + '/cart/' + id);
    return handleApiResponse(res)
};

export { addProductToCart, getAllProductOfCart, removeProductFromCart };

