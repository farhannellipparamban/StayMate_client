import React from 'react';

const VideoSending = ({ message, currentOwner }) => {
  return (
    <div
      className={`p-1 rounded-lg ${
        message.senderId === currentOwner
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    >
      <div className="relative">
        {/* Check if message.videos exists and is an array */}
        {message.videos && Array.isArray(message.videos) && (
          message.videos.map((video, index) => (
            <video
              key={index}
              controls 
              src={video.url}
              className="rounded-lg"
              alt={`Video ${index}`} // Change alt to Video instead of Image
              height={300}
              width={300}
            />
          ))
        )}
        {/* Additional content can be added here */}
        <div className="absolute bottom-1 right-1 flex items-end gap-1">
          {/* Uncomment the following lines if you want to display message metadata or sender's conversation */}
          {/* <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
            {format(message.createdAt)}
          </span> */}
          {/* <span className="text-bubble-meta">
            {message.senderId === currentOwner.id && (
              <Conversation message={message} currentOwner={currentOwner} />
            )}
          </span> */}
        </div>
      </div>
    </div>
  );
}

export default VideoSending;
