import React, { useRef } from 'react'
import UserNavbar from '../../components/userComponents/userCommon/UserNavbar'
import UserFooter from '../../components/userComponents/userCommon/UserFooter'
import UserHero from '../../components/userComponents/Home/UserHero'
import RoomsForRental from '../../components/userComponents/Home/RoomsForRental'

const UserHome = () => {
  const dataRef = useRef()
  return (
    <>
    <UserNavbar />
    <UserHero dataRef={dataRef}/>
    <RoomsForRental dataRef={dataRef} />
    <UserFooter/>
      
    </>
  )
}

export default UserHome
