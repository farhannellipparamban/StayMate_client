import React from "react";
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar";
import ProfileCard from "../../components/userComponents/profile/profileCard";
import UserFooter from "../../components/userComponents/userCommon/UserFooter";

const ProfilePage = () => {
  return (
    <>
      <UserNavbar />
      <ProfileCard />
      <UserFooter />
    </>
  );
};

export default ProfilePage;
