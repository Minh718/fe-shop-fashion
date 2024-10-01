// src/api/userService.js

import api from "../utils/axiosInterceptor";

import { baseURL } from "../constants/baseURL";
import axios from "axios";
import { handleApiResponse } from "./utilApi";

const getListProductsForHomePage = async () => {
    try {
        const res = await axios.get(baseURL + '/product/public/homepage');
        return handleApiResponse(res).result;
    } catch (error) {
        console.log(error);
        return null;

    }
};
const getProductsForAdminTable = async (data) => {
    const res = await api.get(baseURL + '/product/table/admin', { params: data });
    return handleApiResponse(res);
};

const getProductsForAdminTableByCategory = async (data, idCategory) => {
    const res = await api.get(baseURL + `/product/table/admin/category/${idCategory}`, { params: data });
    console.log(res);
    return handleApiResponse(res);
};
const getProductsForAdminTableBySubCategory = async (data, idSubCategory) => {
    const res = await api.get(baseURL + `/product/table/admin/subcategory/${idSubCategory}`, { params: data });
    console.log(res);

    return handleApiResponse(res);
};

const getProductDetail = async (id) => {
    const res = await axios.get(baseURL + '/product/' + id);
    return handleApiResponse(res).result;
}

const getPublicProducts = async (data) => {
    const res = await axios.get(baseURL + '/product/public', { params: data });
    return handleApiResponse(res);
}

const searchProducts = async (data) => {
    const res = await axios.get(baseURL + '/product/search', { params: data });
    return handleApiResponse(res);
}
const getPublicProductsBySubCategory = async ({ page = 0, size = 10, thump, sortBy = "random", order = "asc" }) => {
    const res = await axios.get(baseURL + '/product/public/subCategory?page=' + page + '&size=' + size + '&sortBy=' + sortBy + '&order=' + order + '&thump=' + thump);
    return handleApiResponse(res);
}

const draftProduct = async (id) => {
    await api.get(baseURL + `/product/draft/${id}`);
};

const publishProduct = async (id) => {
    await api.get(baseURL + `/product/publish/${id}`);
};
const deleteProduct = async (id) => {
    const res = await api.get(baseURL + `/product/${id}`);
    return handleApiResponse(res);
};

const getProductDetailAdmin = async (id) => {
    const res = await api.get(baseURL + '/product/admin/' + id);
    return handleApiResponse(res).result;
}
const getAllColorsOfProduct = async (id) => {
    const res = await api.get(baseURL + '/color/productSize/' + id);
    return handleApiResponse(res);
}
const addProduct = async (formdata) => {
    const res = await axios.post(baseURL + '/product/add', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return handleApiResponse(res);
}
export { getAllColorsOfProduct, searchProducts, addProduct, getProductDetailAdmin, deleteProduct, publishProduct, draftProduct, getProductsForAdminTableBySubCategory, getListProductsForHomePage, getProductDetail, getPublicProducts, getPublicProductsBySubCategory, getProductsForAdminTable, getProductsForAdminTableByCategory };

