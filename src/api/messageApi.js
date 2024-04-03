import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const messageInstance = axios.create({ baseURL: baseURL });

export const getMessages = (id) => messageInstance.get(`/message/${id}`);

export const addMessage = (data) => messageInstance.post("/message", data);
