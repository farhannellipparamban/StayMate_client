import React from "react";
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar";
import Contact from "../../components/common/Contact/Contact";
import UserFooter from "../../components/userComponents/userCommon/UserFooter";

const UserContactPage = () => {
  return (
    <>
      <UserNavbar />
      <Contact />
      <UserFooter />
    </>
  );
};

export default UserContactPage;
