// src/api/userService.js

import api from "../utils/axiosInterceptor";

import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { handleApiResponse } from "./utilApi";

const getAllCategories = async () => {
    try {
        const res = await axios.get(baseURL + '/category/all');
        return handleApiResponse(res).result;
    } catch (error) {
        console.log(error);
    }
};


export { getAllCategories };

