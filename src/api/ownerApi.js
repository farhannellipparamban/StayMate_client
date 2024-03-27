import { ownerAxiosInstance } from "./axiosInstance";

export const ownerSignup = async (signupData) => {
  const data = await ownerAxiosInstance.post("/signup", signupData);
  return data;
};

export const ownerOtpVerification = async (otp, ownerId) => {
  const data = await ownerAxiosInstance.post("/otp", { otp, ownerId });
  return data;
};

export const ownerResendOtp = async (ownerEmail) => {
  const data = await ownerAxiosInstance.post("/resendOtp", { ownerEmail });
  return data;
};

export const ownerLoginVerification = async (loginData) => {
  const data = await ownerAxiosInstance.post("/login", loginData);
  return data;
};

export const ownerGoogleAuth = async (authResult) => {
  try {
    const { uid, displayName, email, photoURL } = authResult.user;
    const data = await ownerAxiosInstance.post("/googleLogin", {
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

export const ownerForgetPassword = async (ownerEmail) => {
  const data = await ownerAxiosInstance.post("/ownerForget", { ownerEmail });
  return data;
};
export const ownerResetPassword = async (id, email, password) => {
  const data = await ownerAxiosInstance.patch(
    `/ownerResetPass/${id}/${email}`,
    { password }
  );
  return data;
};

export const updateOwnerProfile = async (ownerData) => {
  const data = await ownerAxiosInstance.put("/editProfile", { ...ownerData });
  return data;
};

export const addRooms = async (
  roomFormData,
  imgAfterCrop,
  location,
  ownerId
) => {
  const data = await ownerAxiosInstance.post("/addRoom", {
    ...roomFormData,
    imgAfterCrop,
    location,
    ownerId,
  });
  console.log(data);

  return data;
};

export const MyRoomsList = async (ownerId) => {
  const data = await ownerAxiosInstance.get(`/roomList/${ownerId}`);
  return data;
};

export const editRoomDetails = async (roomId) => {
  const data = await ownerAxiosInstance.get(`/editRoomDetails/${roomId}`);
  return data;
};
export const editRoom = async (formData) => {
  const data = await ownerAxiosInstance.put("/editRoom", { ...formData });
  return data;
};

export const deleteSingleImage = async (imageUrl, roomId) => {
  const data = await ownerAxiosInstance.patch("/deleteImage", {
    imageUrl,
    roomId,
  });
  return data;
};

export const RoomBlock = async (roomId, status) => {
  const data = await ownerAxiosInstance.patch("/blockRoom", { roomId, status });
  return data;
};

export const Customers = async () => {
  const data = await ownerAxiosInstance.get("/customers");
  return data;
};

export const CustomersBlock = async (customerId, status) => {
  const data = await ownerAxiosInstance.patch("/blockCustomers", {
    customerId,
    status,
  });
  return data;
};

export const bookingsOwner = async (ownerId) => {
  const data = await ownerAxiosInstance.get(`/bookingsOwner/${ownerId}`);
  return data;
};

export const cancelBookingOwner = async (bookingId, reason) => {
  const data = await ownerAxiosInstance.post("/cancelBooking", {
    bookingId,
    reason,
  });
  return data;
};

export const changeBookingStatus = async (
  status,
  bookingId,
  startDate,
  endDate,
  roomId
) => {
  const data = await ownerAxiosInstance.patch("/changeStatus", {
    status,
    bookingId,
    startDate,
    endDate,
    roomId,
  });
  return data;
};

export const allRequestCancel = async (ownerId) => {
  const data = await ownerAxiosInstance.get(`/cancelRequests/${ownerId}`);
  return data;
};
export const cancelRequestApproval = async (bookingId, status) => {
  const data = await ownerAxiosInstance.patch("/approveCancel", {
    bookingId,
    status,
  });
  return data;
};

export const dashboardReport = async (ownerId) =>
  await ownerAxiosInstance.get(`/report/${ownerId}`);

export const addOffer = async (offerFormData) => {
  const data = await ownerAxiosInstance.post("/addOffer", offerFormData);
  return data;
};

export const offerList = async () => {
  const data = await ownerAxiosInstance.get("/offerList");
  return data;
};

export const editOfferDetails = async (offerId) => {
  const data = await ownerAxiosInstance.get(`/editOfferDetails/${offerId}`);
  return data;
};

export const editOffer = async (offerData) => {
  const data = await ownerAxiosInstance.put("/editOffer", { ...offerData });
  return data;
};

export const deleteOffer = async (offerId) => {
  const data = await ownerAxiosInstance.patch(`/deleteOffer/${offerId}`);
  return data;
};
