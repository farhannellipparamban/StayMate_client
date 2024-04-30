import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../../api/chatApi";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import io from "socket.io-client";

// const END_POINT = "https://staymate.onrender.com/";
const END_POINT = "http://www.staymate.clocksy.online/";
let socket;

const Chat = () => {
  const { _id } = useSelector((state) => state.ownerReducer.owner);
  const ownerId = _id;
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    userChats(ownerId).then((res) => {
      setConversations(res?.data);
    });
  }, []);

  useEffect(() => {
    socket = io(END_POINT);
  }, []);

  useEffect(() => {
    socket?.emit("setup", ownerId);
    socket?.on("get-users", (users) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.disconnect();
    };
  }, [ownerId]);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      if (data?.chatId === currentChat?._id) {
        const message = [...messages, data];
        setMessages(message);
      }

      const updateConverstaions = conversations.map((chat) => {
        if (chat._id === data.chatId) {
          return { ...chat, lastMessage: Date.parse(data.createdAt) };
        }
        return chat;
      });

      const sortConversations = [...updateConverstaions].sort((a, b) => {
        const aTimestamp = a.lastMessage || 0;
        const bTimestamp = b.lastMessage || 0;
        return bTimestamp - aTimestamp;
      });
      setConversations(sortConversations);
    });
  }, [messages, currentChat, conversations]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== ownerId);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const markMessageAsUnread = (chatId) => {
    const updatedConversations = conversations.map((chat) => {
      if (chat._id === chatId) {
        return { ...chat, unread: true };
      }
      return chat;
    });
    setConversations(updatedConversations);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-gray-200 overflow-y-auto">
        <div className="pt-20">
          {conversations?.map((chat) => (
            <div
              key={chat._id}
              onClick={() => {
                setCurrentChat(chat);
                socket?.emit("join room", chat._id);
              }}
              className="cursor-pointer hover:bg-gray-300 p-2"
            >
              <ChatList
                data={chat}
                currentOwnerId={ownerId}
                online={checkOnlineStatus(chat)}
                markMessageAsUnread={() => markMessageAsUnread(chat._id)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 bg-gray-100 shadow-md rounded-md">
        <div className="p-4 md:p-6 flex flex-col h-full">
          <div className="flex flex-col justify-end font-semibold text-gray-900 flex-1">
            <div className="flex-1 flex flex-col justify-center ">
              <ChatBox
                chat={currentChat}
                currentOwner={ownerId}
                setMessages={setMessages}
                messages={messages}
                socket={socket}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
