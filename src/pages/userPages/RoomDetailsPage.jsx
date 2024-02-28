import { React, Suspense, lazy } from "react";
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar";
import UserFooter from "../../components/userComponents/userCommon/UserFooter";
import Loading from "../../components/loading/Loading";
const RoomDetails = lazy(() =>
  import("../../components/userComponents/Rooms/RoomDetails")
);

const RoomDetailsPage = () => {
  return (
    <>
      <UserNavbar />
      <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loading/></div>}>
        <RoomDetails />
      </Suspense>
      <UserFooter />
    </>
  );
};

export default RoomDetailsPage;
