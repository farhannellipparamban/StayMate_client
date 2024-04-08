import React from "react";
import { format } from "timeago.js";

const Conversation = ({ message, currentUser }) => {
  return (
    <div id="messages" className="">
      {currentUser === message?.senderId ? (
        <div className="chat-message flex items-end justify-end mb-4">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div className="rounded-lg bg-blue-600 text-white break-words p-2 max-w-max">
              {message?.text}
            </div>
          </div>
          <div className="text-black font-extralight ml-2">
            {format(message?.createdAt)}
          </div>
        </div>
      ) : (
        <div className="chat-message flex items-end mb-4">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div className="rounded-lg bg-gray-300 text-gray-600 break-words p-2 max-w-max">
              {message?.text}
            </div>
            <div className="text-xs text-gray-500">
              {format(message?.createdAt)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
