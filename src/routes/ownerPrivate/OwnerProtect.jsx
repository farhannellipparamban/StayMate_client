import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { ownerLogout } from "../../reduxStore/slices/ownerSlice";

const OwnerProtect = (props) => {
  const dispatch = useDispatch();
  try {
    const token = localStorage.getItem("ownerToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        // eslint-disable-next-line react/prop-types
        return props.children;
      } else {
        localStorage.removeItem("ownerToken");
        dispatch(ownerLogout());
        toast.info("You must login first");
        return <Navigate to="/owner/login" />;
      }
    } else {
      return <Navigate to="/owner/login" />;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default OwnerProtect;
