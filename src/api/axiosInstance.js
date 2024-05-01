import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = import.meta.env.VITE_BASE_URL;
const userBaseURL = baseURL;
const ownerBaseURL = `${baseURL}owner`;
const adminBaseURL = `${baseURL}admin`;

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 200000,
    timeoutErrorMessage: "Request Timeout... Please try again!..",
  });
  return instance;
};

const attachToken = (req, tokenName) => {
  let authToken = localStorage.getItem(tokenName);
  if (attachToken) {
    req.headers.Autherization = `Bearer ${authToken}`;
  }
  return req;
};

//request interceptor

export const userAxiosInstance = createAxiosInstance(userBaseURL);
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "userToken");
  return modifiedReq;
});

export const ownerAxiosInstance = createAxiosInstance(ownerBaseURL);
ownerAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "ownerToken");
  return modifiedReq;
});

export const adminAxiosInstance = createAxiosInstance(adminBaseURL);
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "adminToken");
  return modifiedReq;
});

//response interceptor

userAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error, "user")
);

adminAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error, "admin")
);

ownerAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error, "owner")
);

const handleAxiosError = (error, role) => {
  const errorMessage = error.response
    ? error.response.data.message
    : "An error occurred while request.";

  if (error.response) {
    if (error.response.status === 404) {
      if (role === "user") {
        window.location.href = `/pageNotFound`;
      } else {
        window.location.href = `/${role}/pageNotFound`;
      }
      toast.error("404 - Resource Not Found");
    // } else if (error.response.status === 500) {
    //   toast.error("500 - Internal Server Error");
    //   if (role === "user") {
    //     window.location.href = `/error-500`;
    //   } else {
    //     window.location.href = `/${role}/error-500`;
    //   }
    } else if (error.response?.data?.message === "Access Denied") {
      if (role === "user") {
        window.location.href = `/login`;
      } else if (role === "owner") {
        window.location.href = `/owner/login`;
      } else if (role === "admin") {
        window.location.href = `/admin`;
      }
    } else if (error.response?.data?.message === "User is blocked") {
      if (role === "user") {
        toast.error("Account blocked by admin");
        window.location.href = `/login`;
      } else if (role === "owner") {
        toast.error("Account blocked by admin");
        window.location.href = `/owner/login`;
      } else if (role === "admin") {
        toast.error("Account blocked by admin");
        window.location.href = `/admin`;
      }
    } else {
      toast.error(errorMessage);
    }
  } else {
    toast.error(errorMessage);
  }
};
