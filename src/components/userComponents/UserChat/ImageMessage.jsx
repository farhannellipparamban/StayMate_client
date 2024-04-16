import React from "react";
import { format } from "timeago.js";
// import Conversation from "./Conversation";

const ImageMessage = ({ message, currentUser }) => {
  return (
    <div
      className={`p-1 rounded-lg ${
        message.senderId === currentUser
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
          {/* Assuming Conversation component handles the conversation details */}
          <span className="text-bubble-meta">
            {message.senderId === currentUser.id && (
              <Conversation message={message} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageMessage;
