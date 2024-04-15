import React, { useEffect, useState } from "react";
import { getOwner } from "../../../api/chatApi";

const ChatList = ({ data, currentUserId, online, markMessageAsUnread }) => {
  const [ownerData, setOwnerData] = useState(null);

  useEffect(() => {
    const ownerId = data?.members?.find((id) => id !== currentUserId);
    const getOwnerData = async () => {
      try {
        const { data } = await getOwner(ownerId);
        setOwnerData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOwnerData();
  }, [data, currentUserId]);

  return (
    <>
      <div
        className="flex flex-row px-5 py-3 justify-center items-center border-b-2 bg-gray-200 hover:bg-gray-300"
        onClick={() => markMessageAsUnread(data._id)} 
      >
        {(ownerData?.unread || data.unread) && (
          <div className="absolute h-4 w-4 bg-red-500 rounded-full top-0 right-0"></div>
        )}
        <div className="w-1/4">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80"
            className="object-cover h-12 w-12 rounded-full"
            alt=""
          />
          
        </div>
        <div className="w-full">
          <div className="text-lg font-semibold">{ownerData?.name}</div>
          <span className="text-gray-500">{online ? "Online" : "Offline"}</span>
          {markMessageAsUnread && (
            <span className="absolute h-4 w-4 bg-green-500 rounded-full top-56 left-80"></span>
          )}
        </div>
      </div>
      <hr className="w-11/12 mx-auto border-gray-200" />
    </>
  );
};

export default ChatList;
