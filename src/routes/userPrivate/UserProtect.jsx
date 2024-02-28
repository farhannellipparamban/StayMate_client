import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLogout } from "../../reduxStore/slices/userSlice";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const UserProtect = (props) => {
  const dispatch = useDispatch();
  try {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        return props.children;
      } else {
        localStorage.removeItem("userToken");
        dispatch(userLogout());
        toast.success("You must login first");
        return <Navigate to="/login" />;
      }
    } else {
      toast.success("You must login first");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default UserProtect;
