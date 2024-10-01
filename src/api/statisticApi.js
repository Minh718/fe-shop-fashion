// src/api/userService.js

import api from "../utils/axiosInterceptor";

import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { handleApiResponse } from "./utilApi";

const getStatisticsDashboard = async (type) => {
    try {

        const res = await api.get(baseURL + '/statistic/dashboard?type=' + type);
        return handleApiResponse(res).result
    } catch (e) {
        console.log(e)
        return null;
    }
};


export { getStatisticsDashboard };

