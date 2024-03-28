import { userAxiosInstance } from "./axiosInstance";

export const userSignup = async (signupData) => {
  const data = await userAxiosInstance.post("/signup", signupData);
  return data;
};

export const otpVerification = async (otp, otpId, userId) => {
  const data = await userAxiosInstance.post("/otp", { otp, userId });
  return data;
};

export const clientResendOtp = async (userEmail) => {
  const data = await userAxiosInstance.post("/resendOtp", { userEmail });
  return data;
};

export const loginVerification = async (loginData) => {
  const data = await userAxiosInstance.post("/login", loginData);
  return data;
};

export const googleAuth = async (authResult) => {
  try {
    const { uid, displayName, email, photoURL } = authResult.user;
    const data = await userAxiosInstance.post("/googleLogin", {
      uid,
      displayName,
      email,
      photoURL,
    });
    return data;
  } catch (error) {
    console.error("Error during Google authentication:", error);
    throw error;
  }
};

export const userForgetPassword = async (userEmail) => {
  const data = await userAxiosInstance.post("/forgetPassword", { userEmail });
  return data;
};
export const userResetPassword = async (id, email, password) => {
  const data = await userAxiosInstance.put(`/resetPassword/${id}/${email}`, {
    password,
  });
  return data;
};

export const HomeRoomList = async () => {
  const data = await userAxiosInstance.get("/homeRoomList");
  return data;
};

export const allRoomList = async () => {
  const data = await userAxiosInstance.get("/allRooms");
  return data;
};

export const getRoomDetails = async (roomId) => {
  const data = await userAxiosInstance.get(`/roomDetails/${roomId}`);
  return data;
};

export const checkRoomAvailability = async (roomId, startDate, endDate) => {
  const data = await userAxiosInstance.post("/checkAvailable", {
    roomId,
    startDate,
    endDate,
  });
  return data;
};

export const updateUserProfile = async (userData) => {
  const data = await userAxiosInstance.put("/editProfile", userData);
  return data;
};

export const roomBooking = async (bookingData) => {
  const data = await userAxiosInstance.post("/roomBooking", bookingData);
  return data;
};
export const verifyPayment = async (response, bookingData) => {
  const data = await userAxiosInstance.post("/verifyPayment", {
    response,
    bookingData,
  });
  return data;
};

export const filterDateLoacionRooms = async (formData) => {
  const data = await userAxiosInstance.post("/filterRooms", formData);
  console.log(data,"from api");
  return data;
};
export const myBookings = async (userId) => {
  const data = await userAxiosInstance.get(`/myBookings/${userId}`);
  return data;
};

export const cancelBookingUser = async (bookingId, reason) => {
  const data = await userAxiosInstance.post("/cancelBooking", {
    bookingId,
    reason,
  });
  return data;
};

export const getUserDetails = async (userId) => {
  const data = await userAxiosInstance.get(`/userDetails/${userId}`);
  return data;
};

export const allCoupons = async () => {
  const data = await userAxiosInstance.get("/allCoupons");
  return data;
};
export const applyCoupon = async (couponCode, userId) => {
  const data = await userAxiosInstance.post("/applyCoupon", {
    couponCode,
    userId,
  });
  return data;
};

export const loadOffer = async () => {
  const data = await userAxiosInstance.get("/loadOffer");
  return data;
};

export const addRoomsReview = async (reviewData)=>{
  const data = await userAxiosInstance.put("/addRoomsReview",reviewData)
  return data
}