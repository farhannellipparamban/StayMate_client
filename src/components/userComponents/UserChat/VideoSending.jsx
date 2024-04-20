import React from 'react'

const VideoSending = ({message,currentUser}) => {
  return (
<div
      className={`p-1 rounded-lg ${
        message.senderId === currentUser
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    >
      <div className="relative">
        {message.videos &&
          Array.isArray(message.videos) &&
          message.videos.map((video, index) => (
            <video
              key={index}
              controls 
              src={`http://localhost:8000/videos/${video.split("\\").pop()}`}
              className="rounded-lg"
              alt={`Video ${index}`} // Change alt to Video instead of Image
              height={300}
              width={300}
            />
          ))}
        <div className="absolute bottom-1 right-1 flex items-end gap-1">
          {/* Uncomment the following lines if you want to display message metadata or sender's conversation */}
          {/* <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
            {format(message.createdAt)}
          </span> */}
          {/* <span className="text-bubble-meta">
            {message.senderId === currentUser.id && (
              <Conversation message={message} currentUser={currentUser} />
            )}
          </span> */}
        </div>
      </div>
    </div>
  )
}

export default VideoSending
