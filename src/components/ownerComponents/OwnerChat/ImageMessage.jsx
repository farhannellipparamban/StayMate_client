import React from "react";
import { format } from "timeago.js";
import Conversation from "./Conversation";

const ImageMessage = ({ message, currentOwner }) => {
  return (
    <div
      className={`p-1 rounded-lg ${
        message.senderId === currentOwner
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    >
      <div className="relative">
        {message.images &&
          Array.isArray(message.images) &&
          message.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:8000/images/${image.split('\\').pop()}`}
              className="rounded-lg"
              alt={`Image ${index}`}
              height={300}
              width={300}
            />
          ))}
        <div className="absolute bottom-1 right-1 flex items-end gap-1">
          {/* <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
            {format(message.createdAt)}
          </span> */}
          <span className="text-bubble-meta">
            {message.senderId === currentOwner.id && (
              <Conversation message={message} currentOwner={currentOwner} />
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ImageMessage
