import React from 'react'
import OwnerNavbar from '../../components/ownerComponents/ownerCommon/OwnerNavbar'
import OwnerSidebar from '../../components/ownerComponents/dashboard/OwnerSidebar'
import DashboaedHome from '../../components/ownerComponents/dashboard/home/DashboaedHome'

const OwnerDashboard = () => {
  return (
    <>
      <OwnerNavbar />
      <div className='mx-auto w-full flex'>
        <OwnerSidebar />
        <DashboaedHome />
      </div>
    </>
  )
}

export default OwnerDashboard
