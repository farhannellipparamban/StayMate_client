import React, { Suspense, lazy } from "react";
import OwnerNavbar from "../../components/ownerComponents/ownerCommon/OwnerNavbar";
import OwnerSidebar from "../../components/ownerComponents/dashboard/OwnerSidebar";
import Loading from "../../components/loading/Loading";
const RoomsList = lazy(() =>
  import("../../components/ownerComponents/dashboard/RoomsList")
);

const RoomListPage = () => {
  return (
    <>
      <OwnerNavbar />
      <div className="mx-auto w-full flex -mt-6">
        <OwnerSidebar/>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <Loading />
            </div>
          }
        >
          <RoomsList />
        </Suspense>
      </div>
    </>
  );
};

export default RoomListPage;
