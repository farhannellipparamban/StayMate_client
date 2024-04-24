import React, { useEffect, useRef, useState } from "react";
import {
  fileSendingMessage,
  imageSendingMessage,
  videoSendingMessage,
} from "../../../api/messageApi";
import Conversation from "./Conversation";
import { toast } from "react-toastify";


const ALLOWED_FILE_TYPES = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];


const FilesSelector = ({ chat, socket, currentUser, message }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePicker, setImagePicker] = useState(false);
  const [videoPicker, setVideoPicker] = useState(false);
  const [filesPicker, setFilesPicker] = useState(false);
  const socketRef = useRef(socket);

  useEffect(() => {
    
    const data = document.getElementById("photo-picker");
    if (data) {
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setSelectedImage(false);
        }, 1000);
      };
    }
  }, []);

  const filesPickerChange = async (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          resizeAndSendImage(file);
        } else if (file.type.startsWith("video/")) {
          handleSendVideo(file);
        } else {
          handleSendFile(file);
        }
      }
    }
  };

  const resizeAndSendImage = async (file) => {
    resizeImage(file, 800, 600, async (resizedImageBlob) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;

        const response = await imageSendingMessage({
          chatId: chat._id,
          senderId: currentUser,
          images: [{ url: base64Image }],
        });

        if (response.status === 201) {
          console.log("Image message sent successfully");
          socket.emit("send_message", {
            to: currentUser,
            from: chat._id,
            message: response.data.message,
          });
          toast.success(response.data.message);

        }
        toast.error(error.response?.data?.message);

      };
      reader.readAsDataURL(resizedImageBlob);
    });
  };

  const handleSendVideo = async (file) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Videos = reader.result;

        const response = await videoSendingMessage({
          chatId: chat._id,
          senderId: currentUser,
          videos: [{ url: base64Videos }],
        });

        if (response.status === 201) {
          console.log("video message sent successfully");
          socket.emit("send_message", {
            to: currentUser,
            from: chat._id,
            message: response.data.message,
          });
          toast.success(response.data.message);

        }
      };
    } catch (error) {
      console.error("Error sending videos:", error);
      toast.error(error.response?.data?.message);

    }
  };

  const handleSendFile = async (file) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Files = reader.result;
        const fileExtension = file.name.split('.').pop().toLowerCase();
  
        // Check if the file extension is allowed
        if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
          console.error('File type not allowed');
          return;
        }
  
        const response = await fileSendingMessage({
          chatId: chat._id,
          senderId: currentUser,
          files: [{ url: base64Files, fileName: file.name, fileExtension }],
        });
  
        if (response.status === 201) {
          console.log('Files message sent successfully');

          socket.emit('send_message', {
            to: currentUser,
            from: chat._id,
            message: response.data.message,
          });
          toast.success(response.data.message);

        }
      };
    } catch (error) {
      console.error('Error sending files:', error);
      toast.error(error.response?.data?.message);

    }
  };

  // Function to resize the image
  function resizeImage(file, maxWidth, maxHeight, callback) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(callback);
    };
    img.src = URL.createObjectURL(file);
  }

  return (
    <div>
      <input
        type="file"
        id="photo-picker"
        multiple
        style={{ display: "none" }}
        onChange={filesPickerChange}
      />
      {imagePicker && (
        <Conversation message={message} currentUser={currentUser} />
      )}
      {videoPicker && (
        <Conversation message={message} currentUser={currentUser} />
      )}
      {filesPicker && (
        <Conversation message={message} currentUser={currentUser} />
      )}
    </div>
  );
};

export default FilesSelector;
