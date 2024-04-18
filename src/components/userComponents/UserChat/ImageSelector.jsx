import React, { useState } from "react";

const ImageSelector = ({ onImageSelect, onImageSend }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      onImageSelect(event);
    }
  };

  const handleSendClick = () => {
    if (selectedImage) {
      onImageSend(selectedImage);
      setSelectedImage(null);
    }
  };

  return (
    <div>
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" className="max-w-xs" />
          <button onClick={handleSendClick}>Send</button>
        </div>
      )}
      <input
        type="file"
        id="photo-picker"
        accept="image/*,video/*"
        multiple
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageSelector;
