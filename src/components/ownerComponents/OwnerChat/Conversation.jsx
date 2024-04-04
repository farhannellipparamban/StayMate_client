import React from "react";
import { format } from "timeago.js";

const Conversation = ({ message, currentOwner }) => {
  return (
    <div id="messages" className="">
      {currentOwner === message.senderId ? (
        <div className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
              <div>
                <span
                  className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white break-words"
                  style={{ maxWidth: "350px" }}
                >
                  {message.text}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end text-black font-extralight">
            {format(message.createdAt)}
          </div>
        </div>
      ) : (
        <div className="chat-message">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span
                  className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 break-words"
                  style={{ maxWidth: "350px" }}
                >
                  {message.text}
                </span>
                <span> {format(message.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-start text-black font-extralight"></div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
