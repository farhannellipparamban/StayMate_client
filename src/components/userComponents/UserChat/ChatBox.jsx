import React, { useEffect, useRef, useState } from "react";
import { getOwner } from "../../../api/chatApi";
import {
  addMessage,
  getMessages,
  imageSendingMessage,
} from "../../../api/messageApi";
import Conversation from "./Conversation";
import InputEmoji from "react-input-emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import CaptureAudio from "./CaptureAudio";
import ImageMessage from "./ImageMessage";
import ImageSelector from "./ImageSelector";

const ChatBox = ({ chat, currentUser, setMessages, messages, socket }) => {
  const [ownerData, setOwnerData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const [audioMessage, setAudioMessage] = useState(null);

  const scroll = useRef();

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const ownerId = chat?.members?.find((id) => id !== currentUser);

    const getOwnerData = async () => {
      try {
        const { data } = await getOwner(ownerId);
        setOwnerData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (chat !== null) getOwnerData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      let newOne;
      const message = {
        senderId: currentUser,
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
    if (imagePicker) {
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
  }, [imagePicker]);

  // const filesPickerChange = async (e) => {
  //   try {
  //     const formData = new FormData();
  //     const images = e.target.files;
  //     formData.append("chatId", chat._id);
  //     formData.append("senderId", currentUser);
  //     for (let i = 0; i < images.length; i++) {
  //       formData.append("image", images[i]);
  //     }

  //     const response = await imageSendingMessage(formData);

  //     if (response.status === 201) {
  //       console.log("image message sent successfully");

  //       socket.emit("send_message", {
  //         to: currentUser,
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
      formData.append("senderId", currentUser);
      formData.append("image", file);

      const response = await imageSendingMessage(formData);

      if (response.status === 201) {
        console.log("image message sent successfully");

        socket.emit("send_message", {
          to: currentUser,
          from: chat._id,
          message: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error sending image:", error);
    }
  };

  const handleSendVideo = async (file) => {
    // Handle video file
    // You can implement the logic for handling video files here
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
              <div className="relative flex items-center space-x-4 -mt-12">
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
                    <span className="text-gray-700 mr-3">
                      {ownerData?.name}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2"></div>
            </div>

            <div
              id="messages"
              className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-1 h-screen scrolling-touch "
            >
              {messages.map((message) => (
                <div ref={scroll} key={message._id}>
                  <Conversation message={message} currentUser={currentUser} />
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
                  currentUser={currentUser}
                  socket={socket}
                  onSendAudio={onSendAudio}
                  message={messages}
                />
              )}
              {imagePicker && (
                <ImageSelector
                  message={messages}
                  chat={chat}
                  socket={socket}
                  onImageSelect={filesPickerChange}
                  onImageSend={handleSendImage}
                  currentUser={currentUser}
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
