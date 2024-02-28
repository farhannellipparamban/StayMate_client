import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <>
      {/* <div className="relative w-64 h-64">
        <div className="pl animate-ball absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="pl__ball w-16 h-16 rounded-full">
            <div className="pl__ball-texture w-full h-full overflow-hidden">
              <div
                className="pl__ball-texture-before absolute top-0 right-0 w-full h-full bg-cover bg-center filter brightness-105"
                style={{
                  backgroundImage:
                    "url(https://assets.codepen.io/416221/snow.jpg)",
                }}
              ></div>
            </div>
            <div className="pl__ball-outer-shadow absolute top-1/2 left-0 w-full h-64 bg-gradient-to-b from-gray-400 to-transparent blur-md rounded-b-full rotate-20 transform origin-top"></div>
            <div className="pl__ball-inner-shadow absolute w-full h-full rounded-full animate-ballInnerShadow">
            </div>
            <div className="pl__ball-side-shadows absolute w-full h-full bg-gray-300 blur-md rounded-full scale-75/110 animate-ballSideShadows">
            </div>
          </div>
        </div>
        <div className="pl__inner-ring absolute top-20 left-20 w-48 h-48 rounded-full border-8 border-white border-opacity-40"></div>
        <div className="pl__outer-ring absolute w-56 h-56 rounded-full border-4 border-gray-200 border-opacity-40"></div>
        <div className="pl__track-cover absolute w-full h-full animate-trackCover bg-gradient-conic to-transparent from-hsl(223, 90%, 95%)"></div>
      </div> */}

  <div className="relative">
    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200 animate-pulse" />
    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-red-600 animate-spin">
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-semibold">Loading...</span>
    </div>
  </div>

    </>
  );
};

export default Loading;
