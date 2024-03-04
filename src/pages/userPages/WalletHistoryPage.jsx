import React from 'react'
import UserNavbar from "../../components/userComponents/userCommon/UserNavbar"
import UserFooter from "../../components/userComponents/userCommon/UserFooter"
import WalletHistoryList from '../../components/userComponents/profile/WalletHistoryList'
import { useLocation } from 'react-router-dom'

const WalletHistoryPage = () => {
    const {state} = useLocation()
    console.log(state);
  return (
    <>
      <UserNavbar />
      <WalletHistoryList user={state}/>
      <UserFooter />
    </>
  )
}

export default WalletHistoryPage
