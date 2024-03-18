import React from 'react'
import AdminNavbar from '../../components/adminCoponents/AdminNavbar'
import AdminSidebar from '../../components/adminCoponents/AdminSidebar'
import CouponList from '../../components/adminCoponents/CouponList'

const CouponListPage = () => {
  return (
<>
      <AdminNavbar />
      <div className="mx-auto w-full flex">
        <AdminSidebar />
        <CouponList />
      </div>
    </>
  )
}

export default CouponListPage
