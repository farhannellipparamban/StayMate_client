import React from "react";
import { format } from "timeago.js";
import VoiceMessage from "./VoiceMessage";
import ImageMessage from "./ImageMessage";

const Conversation = ({ message, currentUser }) => {
  console.log(message);
  return (
    <div id="messages" className="">
      {currentUser === message?.senderId ? (
        <div className="chat-message flex items-end justify-end mb-4">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            
            {message.type === "audioPath" ? (
              { type: "audioPath" }(
                <div className="rounded-lg bg-blue-600 text-white break-words p-2 max-w-max">
                  <VoiceMessage message={message} currentUser={currentUser} />
                </div>
              )
            ) : { type: "images" } ? (
              <ImageMessage message={message} currentUser={currentUser} />
            ) : (
              { type: "message" }(
                <div className="rounded-lg bg-blue-600 text-white break-words p-2 max-w-max">
                  {message?.text}
                </div>
              )
            )}
          </div>
          <div className="text-black font-extralight ml-2">
            {format(message?.createdAt)}
          </div>
        </div>
      ) : (
        <div className="chat-message flex items-end mb-4">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            {message.type === "audioPath" ? (
              <div className="rounded-lg bg-gray-300 text-gray-600 break-words p-2 max-w-max">
                <VoiceMessage message={message} currentUser={currentUser} />
              </div>
            ) : message.type === "image" ? (
              <ImageMessage message={message} currentUser={currentUser} />
            ) : (
              <div className="rounded-lg bg-gray-300 text-gray-600 break-words p-2 max-w-max">
                {message?.text}
              </div>
            )}
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
