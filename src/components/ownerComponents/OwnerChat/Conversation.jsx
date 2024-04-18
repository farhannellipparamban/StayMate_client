import React from "react";
import { format } from "timeago.js";
import VoiceMessage from "./VoiceMessage";
import ImageMessage from "./ImageMessage";
import VideoSendingMessage from "./VideoSending";
import VideoSending from "./VideoSending";

const Conversation = ({ message, currentOwner }) => {
  // console.log(message.videos);
  return (
    <div id="messages" className="">
      {currentOwner === message.senderId ? (
        <div className="chat-message flex items-end justify-end mb-4">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            {message.audioPath ? (
              <div className="rounded-lg bg-blue-600 text-white break-words p-2 max-w-max">
                <VoiceMessage message={message} currentOwner={currentOwner} />{" "}
              </div>
            ) : message.images && message ? (
              <>
                <ImageMessage message={message} currentOwner={currentOwner} />
                <div className="rounded-lg bg-blue-600 text-white break-words p-2 max-w-max">
                  {message.text}
                </div>
              </>
              ) : message.videos? (<>
                <VideoSending message={message} currentOwner={currentOwner} /><div>hhhhh</div></>
            ) : (
              // ) : message.text ? (
              //   <div className="rounded-lg bg-blue-600 text-white break-words p-2 max-w-max">
              //     {message.text}
              //   </div>
              ""
            )}
          </div>
          <div className="flex justify-end text-black font-extralight">
            {format(message.createdAt)}
          </div>
        </div>
      ) : (
        <div className="chat-message flex items-start mb-4">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            {message.audioPath ? (
              <div className="rounded-lg bg-gray-300 text-gray-600 break-words p-2 max-w-max">
                <VoiceMessage message={message} currentOwner={currentOwner} />
              </div>
            ) : message.images && message ? (
              <>
                <ImageMessage message={message} currentOwner={currentOwner} />
                <div className="rounded-lg bg-gray-300 text-gray-600 break-words p-2 max-w-max">
                  {message?.text}
                </div>
              </>
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
