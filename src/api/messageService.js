import { baseURL } from "../constants/baseURL";
import api from "../utils/axiosInterceptor";
import { handleApiResponse } from "./utilApi";

const userGetMessages = async (size) => {
    const res = await api.get(baseURL + '/messages/user/get?size=' + size);
    return handleApiResponse(res).result;
};

const getInfoChatBox = async () => {
    const res = await api.get(baseURL + '/messages/infoChatBox');
    return handleApiResponse(res).result;
};
const adminGetMessages = async ({ size, chatBoxId }) => {
    const res = await api.get(baseURL + '/messages/admin/get?size=' + size + '&chatBoxId=' + chatBoxId);
    return handleApiResponse(res).result;
};
const getChatBoxListUnSeenByAdmin = async () => {
    const res = await api.get(baseURL + '/messages/admin/cbus');
    return handleApiResponse(res).result;
}
const userSendMessage = async (message) => {
    const res = await api.post(baseURL + '/messages/user/send', { message });
    return handleApiResponse(res).result;
}
const adminSendMessage = async (data) => {
    const res = await api.post(baseURL + '/messages/admin/send', data);
    return handleApiResponse(res).result;
}

export { userGetMessages, adminGetMessages, userSendMessage, getChatBoxListUnSeenByAdmin, adminSendMessage, getInfoChatBox };