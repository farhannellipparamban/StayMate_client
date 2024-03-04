import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import OwnerNavbar from '../../components/ownerComponents/ownerCommon/OwnerNavbar'
import OwnerSidebar from '../../components/ownerComponents/dashboard/OwnerSidebar'
import DetailsOwner from '../../components/ownerComponents/dashboard/bookings/DetailsOwner'

const BookingDetailsOwner = () => {
    const {state} = useLocation()
    let {data} = state
    const [bookingData,setBookingData] = useState(data)

  return (
    <>
      <OwnerNavbar />
      <div className="mx-auto w-full flex mt-5">
        <OwnerSidebar />
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <DetailsOwner
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingDetailsOwner
