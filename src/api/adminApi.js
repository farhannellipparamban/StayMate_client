import { adminAxiosInstance } from "./axiosInstance";

export const adminVerifyLogin = async (loginData) => {
  const data = await adminAxiosInstance.post("/login", loginData);
  return data;
};

export const userList = async () => {
  const data = await adminAxiosInstance.get("/userList");
  return data;
};

export const userBlock = async (userId, status) => {
  const data = await adminAxiosInstance.patch("/blockUser", { userId, status });
  return data;
};

export const ownerList = async () => {
  const data = await adminAxiosInstance.get("/ownerList");
  return data;
};

export const ownerBlock = async (ownerId, status) => {
  const data = await adminAxiosInstance.patch("/blockOwner", {
    ownerId,
    status,
  });
  return data;
};

export const roomList = async () => {
  const data = await adminAxiosInstance.get("/roomList");
  return data;
};

export const singleRoomDetails = async (roomId) => {
  const data = await adminAxiosInstance.get(`/singleRoomDetails/${roomId}`);
  return data;
};

export const roomAddRequest = async () => {
  const data = await adminAxiosInstance.get("/roomAddRequest");
  return data;
};
export const verifyRoom = async (roomId, status) => {
  const data = await adminAxiosInstance.patch("/verifyRoom", {
    roomId,
    status,
  });
  return data;
};

export const dashboardReport = async () => {
  const data = await adminAxiosInstance.get("/report");
  return data;
};

export const addCoupons = async (couponData) => {
  const data = await adminAxiosInstance.post("/addCoupon", couponData);
  return data;
};

export const couponList = async () => {
  const data = await adminAxiosInstance.get("/couponList");
  return data;
};

export const editCouponDetails = async (couponId) => {
  const data = await adminAxiosInstance.get(`/editCouponDetails/${couponId}`);
  return data;
};
export const editCoupon = async (couponData) => {
  const data = await adminAxiosInstance.put("/editCoupon", { ...couponData });
  return data;
};

export const deleteCoupon = async (couponId) => {
  const data = await adminAxiosInstance.patch(`/deleteCoupon/${couponId}`);
  return data;
};
