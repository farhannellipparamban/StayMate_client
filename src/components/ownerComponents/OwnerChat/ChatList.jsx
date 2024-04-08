import React, { useEffect, useState } from "react";
import { getUser } from "../../../api/chatApi";

const ChatList = ({ data, currentOwnerId, online }) => {
  console.log(online);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = data?.members?.find((id) => id !== currentOwnerId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserData();
  }, []);
  return (
    <div className="flex flex-row px-5 py-3 justify-center items-center border-b-2 bg-gray-200 hover:bg-gray-50">
      <div className="w-1/4">
        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80" className="object-cover h-12 w-12 rounded-full" alt="" />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{userData?.name}</div>

        <span className="text-gray-500">{online ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
};

export default ChatList;
