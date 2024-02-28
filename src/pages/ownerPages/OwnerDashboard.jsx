import React from 'react'
import OwnerNavbar from '../../components/ownerComponents/ownerCommon/OwnerNavbar'
import OwnerSidebar from '../../components/ownerComponents/dashboard/OwnerSidebar'

const OwnerDashboard = () => {
  return (
    <>
      <OwnerNavbar />
      <div className='mx-auto w-full flex -mt-6'>
        <OwnerSidebar />
      </div>
    </>
  )
}

export default OwnerDashboard
