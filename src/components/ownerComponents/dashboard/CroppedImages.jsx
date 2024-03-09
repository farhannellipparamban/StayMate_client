import React, { useState } from "react";
import Cropper from "react-easy-crop";

const CroppedImages = ({ roomImage, onCropDone, onCropCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels)
  };

  const onAspectRatioChange = (event)=>{
    setAspectRatio(event.target.value)
  }
  return (
    <div className="cropper">
      <div>
        <Cropper
          image={roomImage}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          style={{
            containerStyle: {
              width: "100%",
              height: "80%",
              backgroundColor: "#fff",
            },
          }}
        />
      </div>
      <div className="action-btns">
        <div className="aspect-ratios" onChange={onAspectRatioChange}>
          <input type="radio" value={1 / 1} name="ratio" /> 1:1
          <input type="radio" value={5 / 4} name="ratio" /> 5:4
          <input type="radio" value={4 / 3} name="ratio" /> 4:3
          <input type="radio" value={3 / 2} name="ratio" /> 3:2
          <input type="radio" value={5 / 3} name="ratio" /> 5:3
          <input type="radio" value={16 / 9} name="ratio" /> 16:9
          <input type="radio" value={3 / 1} name="ratio" /> 3:1
        </div>
        <div className="btn-container">
            <button className="btn btn-outline" onClick={onCropCancel}>Cancel</button>
            <button className="btn" onClick={()=>onCropDone(croppedArea)}>Crop & Apply</button>
        </div>
      </div>
    </div>
  );
};

export default CroppedImages;
