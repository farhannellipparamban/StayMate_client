import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const messageInstance = axios.create({ baseURL: baseURL });

export const getMessages = (id) => messageInstance.get(`/message/${id}`);

export const addMessage = (data) => messageInstance.post("/message", data);
export const addAudioMessage = (data ) => messageInstance.post("/message/audioMessage", data);
export const imageSendingMessage = (data) => messageInstance.post("/message/imageMessage", data);
export const videoSendingMessage = (data) => messageInstance.post("/message/videoMessage", data);
export const fileSendingMessage = (data) => messageInstance.post("/message/fileMessage", data);