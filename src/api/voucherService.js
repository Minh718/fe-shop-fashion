// src/api/userService.js

import api from "../utils/axiosInterceptor";

import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { handleApiResponse } from "./utilApi";

const getAllUserVouchers = async () => {

    try {
        const res = await api.get(baseURL + '/vouchers/user/all');
        return handleApiResponse(res).result;
    } catch (error) {
        console.log(error);
    }
};


const getUserVouchers = async ({ page, size = 5 }) => {

    try {
        const res = await api.get(baseURL + '/vouchers/user/get?page=' + page + '&size=' + size);
        return handleApiResponse(res).result;
    } catch (error) {
        console.log(error);
    }
};

export { getAllUserVouchers, getUserVouchers };

