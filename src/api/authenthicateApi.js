// src/api/userService.js

import api from "../utils/axiosInterceptor";

import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { handleApiResponse } from "./utilApi";

const userLoginByGoogle = async (authCode) => {
    const res = await axios.post(baseURL + `/auth/login/google?code=${authCode}`);
    return handleApiResponse(res).result;
};
const userLoginByEmail = async (data) => {
    try {

        const res = await axios.post(baseURL + `/auth/login`, data);
        return handleApiResponse(res).result;
    } catch (e) {
        console.log(e)
    }
};


export { userLoginByGoogle, userLoginByEmail };

