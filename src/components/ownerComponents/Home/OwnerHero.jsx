import React from "react";
import { Link } from "react-router-dom";

const OwnerHero = () => {
  return (
    <>
      <section className="">
        {/* Jumbotron */}
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat"
          style={{
            backgroundPosition: "50%",
            backgroundImage:
              "url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp')",
            height: "500px",
          }}
        >
          <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
            <div className="flex h-full items-center justify-center">
              <div className="px-6 text-center text-white md:px-12">
                <h1 className="mt-2 mb-16 text-5xl font-semibold tracking-tight md:text-6xl xl:text-6xl font-serif">
                  Unlock the door to unforgettable experiences.
                  <br />
                  <span> Your dream stay is just a click away!. </span>
                </h1>
                <Link to="/owner/dashboard">
                  <button
                    type="button"
                    className="rounded border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Get started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Jumbotron */}
      </section>
    </>
  );
};

export default OwnerHero;
