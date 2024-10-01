// src/api/userService.js

import api from "../utils/axiosInterceptor";

import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { handleApiResponse } from "./utilApi";

const getNumberPaymentingOrder = async () => {
    try {

        const res = await api.get(baseURL + '/order/number-pending');
        return handleApiResponse(res).result
    } catch (e) {
        console.log(e)
    }
};
const saveOrder = async (data) => {
    const res = await api.post(baseURL + '/order/save', data);
    return handleApiResponse(res).result;
};
const getOrders = async (page) => {
    const res = await api.get(baseURL + '/order/all?page=' + page);
    return handleApiResponse(res)
};
const getDetailOrder = async (id) => {
    const res = await api.get(baseURL + '/order/' + id);
    return handleApiResponse(res).result
};

export { saveOrder, getDetailOrder, getNumberPaymentingOrder, getOrders };

