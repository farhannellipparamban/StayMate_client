import React from 'react'
import AdminNavbar from '../../components/adminCoponents/AdminNavbar'
import AdminSidebar from '../../components/adminCoponents/AdminSidebar'
import EditCoupons from '../../components/adminCoponents/EditCoupons'

const EditCouponPage = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto w-full flex">
        <AdminSidebar />
        <EditCoupons />
      </div>
    </>
  )
}

export default EditCouponPage
