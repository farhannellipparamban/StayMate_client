import React from 'react'
import AdminNavbar from '../../components/adminCoponents/AdminNavbar'
import AdminSidebar from '../../components/adminCoponents/AdminSidebar'
import RoomAddRequest from '../../components/adminCoponents/RoomAddRequest'

const RoomAddReqPage = () => {
  return (
    <>
      <AdminNavbar/>
      <div className="mx-auto w-full flex mt-5">
        <AdminSidebar />
        <div className="w-full md:w-3/4 px-4 mb-5 mt-5">
          <div className="p-4 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700">
            <h1 className="text-3xl px-3 mb-5 mt-5">Room Add Request</h1>
            <RoomAddRequest />
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomAddReqPage
