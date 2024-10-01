// src/api/userService.js

import api from "../utils/axiosInterceptor";

import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { handleApiResponse } from "./utilApi";

const findAllColorNotInProductSize = async (idProductSize) => {
    const res = await api.get(baseURL + '/color/' + idProductSize);
    return handleApiResponse(res)
};


export { findAllColorNotInProductSize };

