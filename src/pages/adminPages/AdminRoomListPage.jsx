import React from 'react'
import AdminNavbar from '../../components/adminCoponents/AdminNavbar'
import AdminSidebar from '../../components/adminCoponents/AdminSidebar'
import RoomList from '../../components/adminCoponents/RoomList'

const AdminRoomListPage = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto w-full flex">
        <AdminSidebar />
        <RoomList />
      </div>
    </>
  )
}

export default AdminRoomListPage
