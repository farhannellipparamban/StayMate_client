import React from "react";
import OwnerNavbar from "../../components/ownerComponents/ownerCommon/OwnerNavbar";
import OwnerSidebar from "../../components/ownerComponents/dashboard/OwnerSidebar";
import CustomersList from "../../components/ownerComponents/dashboard/CustomersList";

const CustomersListPage = () => {
  return (
    <>
      <OwnerNavbar />
      <div className="mx-auto w-full flex -mt-6">
        <OwnerSidebar />
        <CustomersList />
      </div>
    </>
  );
};

export default CustomersListPage;
