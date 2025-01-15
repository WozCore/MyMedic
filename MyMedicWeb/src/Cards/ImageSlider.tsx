import React, { useState } from "react";
import "./ImageSlider.css";

interface ImageSliderProps {
  images: { id: string; imageUrl: string }[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const currentImage = images[currentIndex]?.imageUrl || "default-placeholder.png";

  return (
    <div className="image-slider">
      <button onClick={handlePrev} className="slider-button">◀</button>
      <img
        src={`http://localhost:5103/images/products/${currentImage}`}
        alt={`Image ${currentIndex + 1}`}
        className="slider-image"
      />
      <button onClick={handleNext} className="slider-button">▶</button>
    </div>
  );
};

export default ImageSlider;
