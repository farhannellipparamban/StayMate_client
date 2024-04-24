import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFile,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

const FilesDocSending = ({ message, currentOwner }) => {
  const renderFileIcon = (fileExtension) => {
    if (fileExtension === "pdf") {
      return <FontAwesomeIcon icon={faFilePdf} className="text-red-600" />;
    } else {
      return <FontAwesomeIcon icon={faFile} className="text-gray-600" />;
    }
  };

  const downloadFile = async (fileUrl, fileName) => {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`p-4 rounded-lg ${
        message.senderId === currentOwner ? "bg-blue-600" : "bg-gray-300"
      } shadow-md`}
    >
      {message.files &&
        Array.isArray(message.files) &&
        message.files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-400 py-2"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg mr-3">
                {renderFileIcon(file.fileExtension)} {/* Display file icon */}
              </div>
              <span className="text-sm font-medium text-black">
                {file.fileName}
              </span>{" "}
              {/* Display file name */}
            </div>
            <div>
              <button
                onClick={() => downloadFile(file.url, file.fileName)}
                className="flex items-center text-gray-600 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v9m0 0l-4-4m4 4l4-4"
                  />
                </svg>
                {/* <span className="text-sm">Download</span> */}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FilesDocSending;
