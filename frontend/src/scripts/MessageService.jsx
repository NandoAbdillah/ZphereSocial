import axiosClient from './axiosClient';

export const getMessages = async (userId) => {
    const response = await axiosClient.get(`/messages/${userId}`);
    return response.data;
};

export const sendMessage = async (messageData) => {
    const response = await axiosClient.post('/messages', messageData);
    return response.data;
};
