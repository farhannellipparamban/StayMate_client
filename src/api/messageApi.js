import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const messageInstance = axios.create({ baseURL: baseURL });

export const getMessages = (id) => messageInstance.get(`/message/${id}`);

export const addMessage = (data) => messageInstance.post("/message", data);
export const addAudioMessage = (formData ) => messageInstance.post("/message/audioMessage", formData);
export const imageSendingMessage = (formData) => messageInstance.post("/message/imageMessage", formData);
export const videoSendingMessage = (formData) => messageInstance.post("/message/videoMessage", formData);
export const fileSendingMessage = (formData) => messageInstance.post("/message/fileMessage", formData);