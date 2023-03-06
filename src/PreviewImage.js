import React, { useState } from "react";

function PreviewImage({ src, alt, onClose, author }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="preview-overlay">
      <div className="preview-container">
        {imageLoaded && (
          <div className="preview-close">
            <button className="close-button" onClick={onClose}>
              x
            </button>
          </div>
        )}
        <div className="preview-image">
          <img src={src} alt={alt} onLoad={handleImageLoad} />
        </div>
      </div>
    </div>
  );
}

export default PreviewImage;
