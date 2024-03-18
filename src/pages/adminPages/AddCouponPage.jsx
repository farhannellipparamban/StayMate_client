import React from 'react'
import AdminNavbar from '../../components/adminCoponents/AdminNavbar'
import AdminSidebar from '../../components/adminCoponents/AdminSidebar'
import AddCoupons from '../../components/adminCoponents/AddCoupons'

const AddCouponPage = () => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto w-full flex">
        <AdminSidebar />
        <AddCoupons />
      </div>
    </>
  )
}

export default AddCouponPage
