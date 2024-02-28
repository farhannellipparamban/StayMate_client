import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import { ownerLogin } from "../../reduxStore/slices/ownerSlice";
import { ownerGoogleAuth } from "../../api/ownerApi";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/firebase";

const OwnerGoogleLogin = () => {
    const navigate = useNavigate();
    const useSelectors = useSelector((state) => state.owner);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleGoogleClick = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        const result = await signInWithPopup(auth,provider)
        console.log(result);
        const res = await ownerGoogleAuth(result);
  
        if (res?.status === 200) {
          const { owner, token } = res.data;
          console.log(owner,token,"fhnseivkfdhnik");
          localStorage.setItem("ownerToken", token);
          dispatch(
            ownerLogin({
              owner: owner,
              token: token,
            })
          );
          toast.success(res?.data?.message)
          navigate("/owner");
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
        console.error("Error during Google sign-in:", error);
        setError("Failed to sign in with Google. Please try again !!.");
      } finally {
        setLoading(false);
      }
    };
  return (
    <>
    <Button
        onClick={handleGoogleClick}
        type="button"
        className="bg-white text-black mt-3 hover:opacity-90 flex items-center justify-center w-full py-2 rounded-full hover:bg-gray-200 sm:py-3" // Add flex, items-center, and justify-center here
        disabled={loading}
      >
        <img
          className="w-6 h-6 mr-2" // Add some margin to the right of the image
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        {loading ? "Signing in..." : "Continue with Google"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  )
}

export default OwnerGoogleLogin
