// src/api/userService.js
import Cookies from 'js-cookie';
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from './utilApi';


const getMyInfo = async () => {
    const idUser = Cookies.get('x-user-id');
    if (!idUser) return null;
    try {

        const res = await api.get('/user/my-info');
        return handleApiResponse(res).result;
    } catch (err) {
        return null;
    }
};


export { getMyInfo };

