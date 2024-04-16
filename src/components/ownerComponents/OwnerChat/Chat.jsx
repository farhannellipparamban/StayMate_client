import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../../api/chatApi";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import io from "socket.io-client";

const END_POINT = "http://localhost:8000";
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
  return (
    <div>
      <div className="pt-5">
        <div>
          <div className="md:flex no-wrap md:-mx-2">
            <div className="w-full md:w-3/12 md:mx-2 bg-gray-200">
              <div
                className="bg-gray-200 flex flex-col overflow-y-scroll"
                style={{ maxHeight: "85vh" }}
              >
                <div className="pt-20">
                  <div className="cursor-pointer">
                    {conversations?.map((chat) => (
                      <div
                        key={chat._id}
                        onClick={() => {
                          setCurrentChat(chat);
                          socket?.emit("join room", chat._id);
                        }}
                      >
                        <ChatList
                          data={chat}
                          currentOwnerId={ownerId}
                          online={checkOnlineStatus(chat)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-9/12 mx-2 h-full">
              <div className="bg-gray-100 shadow-sm rounded-sm md:p-1">
                <div className="flex flex-wrap justify-end font-semibold text-gray-900">
                  <div
                    className="flex-1 p:2 sm:p-6 justify-center flex flex-col"
                    style={{ minHeight: "85vh" }}
                  >
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
        </div>
      </div>
    </div>
  );
};

export default Chat;
