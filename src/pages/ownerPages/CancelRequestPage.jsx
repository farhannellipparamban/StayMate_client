import React from 'react'
import OwnerNavbar from '../../components/ownerComponents/ownerCommon/OwnerNavbar'
import OwnerSidebar from '../../components/ownerComponents/dashboard/OwnerSidebar'
import CancelRequest from '../../components/ownerComponents/dashboard/bookings/CancelRequest'

const CancelRequestPage = () => {
  return (
    <>
      <OwnerNavbar />
      <div className="mx-auto w-full flex mt-5">
        <OwnerSidebar />
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
          <div className="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700">
            <h1 className="text-3xl px-3 mb-5 mt-5 font-serif">Cancel Requests</h1>
            <CancelRequest />
          </div>
        </div>
      </div>
    </>
  )
}

export default CancelRequestPage
