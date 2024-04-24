import React from "react";
import { format } from "timeago.js";
import Conversation from "./Conversation";

const ImageMessage = ({ message, currentOwner }) => {
  return (
    <>
      {message.images &&
        Array.isArray(message.images) &&
        message.images.map((image, index) => (
          <div
            key={index}
            className={`flex items-center gap-5 text-gray-900 px-4 pr-2 py-4 text-sm rounded-md ${
              message.senderId === currentOwner
                ? "bg-incoming-background"
                : "bg-outgoing-background"
            }`}
          >
            <div>
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80"
                alt=""
                className="w-8 sm:w-12 h-8 sm:h-12 rounded-full"
              />
            </div>
            <img
              src={image.url}
              alt="Sent Image"
              height={300}
              width={300}
              className="max-w-sm max-h-96"
            />
          </div>
        ))}
    </>
  )
}

export default ImageMessage
