import React, { useEffect, useState } from "react";

const ChatList = ({ data, currentOwnerId, online }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = data?.members?.find((id) => id !== currentOwnerId);
    console.log(userId, "kuhedush");
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        console.log(data, "uhduh");
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
        <img src="" className="object-cover h-12 w-12 rounded-full" alt="" />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{userData?.name}</div>

        <span className="text-gray-500">{online ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
};

export default ChatList;
