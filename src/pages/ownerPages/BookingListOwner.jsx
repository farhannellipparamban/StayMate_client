import OwnerNavbar from "../../components/ownerComponents/ownerCommon/OwnerNavbar";
import OwnerSidebar from "../../components/ownerComponents/dashboard/OwnerSidebar";
import BookingList from "../../components/userComponents/Booking/BookingList";
import { useSelector } from "react-redux";
import { bookingsOwner, cancelBookingOwner } from "../../api/ownerApi";

const BookingListOwner = () => {
  const { owner } = useSelector((state) => state.ownerReducer);
  return (
    <>
      <OwnerNavbar />
      <div className="flex w-full mt-5">
        <OwnerSidebar />
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
          <div className="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700">
            <BookingList
              id={owner._id}
              BookingListPage={bookingsOwner}
              cancelBooking={cancelBookingOwner}
              role="owner"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingListOwner;
