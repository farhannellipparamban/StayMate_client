import React from 'react'
import OwnerNavbar from '../../components/ownerComponents/ownerCommon/OwnerNavbar'
import OwnerSidebar from '../../components/ownerComponents/dashboard/OwnerSidebar'
import EditOffer from '../../components/ownerComponents/dashboard/EditOffer'

const EditOfferPage = () => {
  return (
    <>
      <OwnerNavbar />
      <div className="mx-auto w-full flex -mt-6">
        <OwnerSidebar />
        <EditOffer />
      </div>
    </>
  )
}

export default EditOfferPage
