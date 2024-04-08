import React, { useEffect, useState } from "react";
import { getOwner } from "../../../api/chatApi";

const ChatList = ({data,currentUserId,online}) => {
    const [ownerData,setOwnerData] = useState(null)
    useEffect(()=>{
        const ownerId = data?.members?.find((id)=>id !== currentUserId)
        console.log(ownerId,"kuhedush");
        const getOwnerData = async()=>{
            try {
                const {data} = await getOwner(ownerId)
                setOwnerData(data)
            } catch (error) {
                console.log(error.message);
            }
        }
        getOwnerData()
    },[data,currentUserId])

  return (
    <>
    <div className="flex flex-col sm:flex-row px-5 py-3 justify-center items-center border-b-2 bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out">
      <div className="sm:w-1/4 mb-3 sm:mb-0 sm:mr-4 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80"
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div className="w-full sm:w-3/4 ml-0 sm:ml-4 flex flex-col justify-center">
        <div className="text-lg font-semibold text-center sm:text-left mb-2 sm:mb-0">{ownerData?.name}</div>
        <span className={`text-sm text-center sm:text-left ${online ? "text-green-500" : "text-gray-500"}`}>
          {online ? "Online" : "Offline"}
        </span>
      </div>
    </div>
    <hr className="w-11/12 mx-auto border-gray-200" />
  </>
  
  );
};

export default ChatList;
