import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../../api/chatApi";
import {
  addMessage,
  getMessages,
  imageSendingMessage,
  videoSendingMessage,
} from "../../../api/messageApi";
import Conversation from "./Conversation";
import InputEmoji from "react-input-emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import CaptureAudio from "./CaptureAudio";
import ImageMessage from "./ImageMessage";
import ImageSelector from "./ImageSelector";
import VideoSending from "./VideoSending";

const ChatBox = ({ chat, currentOwner, setMessages, messages, socket }) => {
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const [videoPicker, setVideoPicker] = useState(false);
  const [audioMessage, setAudioMessage] = useState(null);

  const scroll = useRef();

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentOwner);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentOwner]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (chat !== null) {
          const { data } = await getMessages(chat._id);
          setMessages(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      let newOne;
      const message = {
        senderId: currentOwner,
        text: newMessage,
        chatId: chat._id,
      };
      try {
        const { data } = await addMessage(message);
        newOne = data;
        setMessages([...messages, data]);
        setNewMessage("");
      } catch (error) {
        console.log(error.message);
      }
      socket.emit("send_message", newOne);
    }
  };
  useEffect(() => {
    if (imagePicker || videoPicker) {
      const data = document.getElementById("photo-picker");
      if (data) {
        data.click();
        document.body.onfocus = (e) => {
          setTimeout(() => {
            setImagePicker(false);
          }, 1000);
        };
      }
    }
  }, [imagePicker, videoPicker]);

  // const filesPickerChange = async (e) => {
  //   try {
  //     const formData = new FormData();
  //     const images = e.target.files;
  //     formData.append("chatId", chat._id);
  //     formData.append("senderId", currentOwner);
  //     for (let i = 0; i < images.length; i++) {
  //       formData.append("image", images[i]);
  //     }

  //     const response = await imageSendingMessage(formData);

  //     if (response.status === 201) {
  //       console.log("image message sent successfully");

  //       socket.emit("send_message", {
  //         to: currentOwner,
  //         from: chat._id,
  //         message: response.data.message,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error sending image:", error);
  //   }
  // };
  const filesPickerChange = async (event) => {
    const files = event.target.files;

    // Check if files were selected
    if (files.length > 0) {
      // Iterate through the selected files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Check the type of the file
        if (file.type.startsWith("image/")) {
          // It's an image, handle accordingly
          handleSendImage(file);
        } else if (file.type.startsWith("video/")) {
          // It's a video, handle accordingly
          handleSendVideo(file);
        } else {
          // It's neither an image nor a video, handle accordingly
          handleSendFile(file);
        }
      }
    }
  };

  // Define functions to handle different types of files
  const handleSendImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("chatId", chat._id);
      formData.append("senderId", currentOwner);
      formData.append("image", file);
      console.log(formData, "response");

      const response = await imageSendingMessage(formData);

      if (response.status === 201) {
        console.log("image message sent successfully");

        socket.emit("send_message", {
          to: currentOwner,
          from: chat._id,
          message: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error sending image:", error);
    }
  };

  const handleSendVideo = async (file) => {
    try {
      const formData = new FormData();
      formData.append("chatId", chat._id);
      formData.append("senderId", currentOwner);
      formData.append("video", file);

      console.log(formData, "response");
      const response = await videoSendingMessage(formData);
      if (response.status === 201) {
        console.log("video message sent successfully");

        socket.emit("send_message", {
          to: currentOwner,
          from: chat._id,
          message: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error sending image:", error);
    }
  };

  const handleSendFile = async (file) => {
    // Handle other types of files
    // You can implement the logic for handling other types of files here
  };

  const onSendAudio = (audioMessage) => {
    setAudioMessage(audioMessage);
  };

  return (
    <>
      {chat ? (
        <>
          <div
            className="flex-1 p:2 sm:p-6 justify-center flex flex-col"
            style={{ maxHeight: "80vh" }}
          >
            <div className="flex sm:items-center justify-between  border-b-2 border-gray-200">
              <div className="relative flex items-center space-x-4">
                <div className="relative">
                  <span className="absolute text-green-500 right-0 bottom-0">
                    <svg width="20" height="20">
                      <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80"
                    alt=""
                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                  ></img>
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">{userData?.name}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                  </svg>
                </button> */}
              </div>
            </div>

            <div
              id="messages"
              className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-1 h-screen scrolling-touch "
            >
              {messages.map((message) => (
                <div ref={scroll} key={message._id}>
                  <Conversation message={message} currentOwner={currentOwner} />
                </div>
              ))}
            </div>

            <div className="border-t-2 border-gray-200 px-4 py-4 sm:p-0">
              {!showAudioRecorder && (
                <div className="relative flex flex-col sm:flex-row items-center">
                  <InputEmoji value={newMessage} onChange={handleChange} />

                  <div className="flex mt-4 sm:mt-0">
                    {newMessage.length ? (
                      <button
                        type="button"
                        onClick={handleSend}
                        className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                      >
                        {/* <span className="font-bold">Send</span> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-6 w-6 ml-2 transform rotate-90"
                        >
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                        >
                          <FontAwesomeIcon
                            icon={faMicrophone}
                            className="text-panel-header-icon cursor-pointer text-xl"
                            title="Record"
                            onClick={() => setShowAudioRecorder(true)}
                          />
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                          onClick={() => setImagePicker(true)}
                        >
                          {/* <input
                            type="file"
                            id="photo-picker"
                            accept="image/*,video/*"
                            multiple
                            style={{ display: "none" }}
                            onChange={filesPickerChange}
                          /> */}
                          <FontAwesomeIcon
                            icon={faPaperclip}
                            className="text-panel-header-icon cursor-pointer text-xl"
                            title="Image"
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
              {showAudioRecorder && (
                <CaptureAudio
                  hide={setShowAudioRecorder}
                  chat={chat}
                  currentOwner={currentOwner}
                  socket={socket}
                  onSendAudio={onSendAudio}
                  message={messages}
                />
              )}
              {imagePicker && (
                <ImageSelector
                  message={messages}
                  chat={chat}
                  currentOwner={currentOwner}
                  socket={socket}
                  onImageSelect={filesPickerChange}
                  onImageSend={handleSendImage}
                />
              )}
              {videoPicker && (
                <Conversation
                  message={messages}
                  chat={chat}
                  currentOwner={currentOwner}
                  socket={socket}
                  onVideoSelect={filesPickerChange}
                  onVideoSend={handleSendVideo}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div
          className="flex-1 p:2 sm:p-6 justify-center flex items-center text-gray-400"
          style={{ maxHeight: "90vh", fontSize: "40px" }}
        >
          Open a chat to start a conversation
        </div>
      )}
    </>
  );
};

export default ChatBox;
