// src/api/userService.js

import api from "../utils/axiosInterceptor";

import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { handleApiResponse } from "./utilApi";

const checkoutProducts = async (data) => {
    const res = await api.post(baseURL + '/checkout/products', data);
    return handleApiResponse(res).result;
};


export { checkoutProducts };

