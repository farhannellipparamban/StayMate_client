import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../reduxStore/slices/adminSlice";
import { jwtDecode } from "jwt-decode";

const AdminPublic = (props) => {
  const dispatch = useDispatch();
  try {
    const token = localStorage.getItem("adminToken");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        localStorage.removeItem("adminToken");
        dispatch(adminLogout());
        <Navigate to="/admin" />;
        toast.info("You need to login first");
        return props.children;
      }
    } else {
      <Navigate to="/admin" />;
      return props.children;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default AdminPublic;
