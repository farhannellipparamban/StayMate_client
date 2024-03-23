import React from "react";
import OwnerNavbar from "../../components/ownerComponents/ownerCommon/OwnerNavbar";
import OwnerSidebar from "../../components/ownerComponents/dashboard/OwnerSidebar";
import AddOffer from "../../components/ownerComponents/dashboard/AddOffer";

const AddOfferPage = () => {
  return (
    <>
      <OwnerNavbar />
      <div className="mx-auto w-full flex -mt-6">
        <OwnerSidebar />
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
          <div className="p-4 border-2 border-gray-100 border-solid rounded-lg dark:border-gray-400">
            <h1 className="text-3xl px-3 mb-5 mt-5 font-serif">Add Offer </h1>
            <AddOffer />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOfferPage;
