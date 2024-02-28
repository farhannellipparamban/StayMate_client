import { Navigate } from "react-router-dom";
import { adminLogout } from "../../reduxStore/slices/adminSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const AdminProtect = (props) => {
  const dispatch = useDispatch();
  try {
    const token = localStorage.getItem("adminToken");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // eslint-disable-next-line react/prop-types
        return props.children;
      } else {
        localStorage.removeItem("adminToken");
        dispatch(adminLogout());
        toast.success("You need to login first");
        return <Navigate to="/admin" />;
      }
    } else {
      return <Navigate to="/admin" />;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default AdminProtect;
