import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { ownerLogout } from "../../reduxStore/slices/ownerSlice";

const OwnerPublic = (props) => {
  const dispatch = useDispatch();
  try {
    const token = localStorage.getItem("ownerToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        return <Navigate to="/owner" />;
      } else {
        localStorage.removeItem("ownerToken");
        dispatch(ownerLogout());
        toast.success("You must login first");
        <Navigate to="/owner/login" />;
        return props.children;
      }
    } else {
      <Navigate to="/owner/login" />;
      return props.children;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default OwnerPublic;
