import React, { useState, useEffect, MouseEvent } from 'react';
import '../css/CarouselFade.css';
interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoplay) {
        setCurrentImage(prevIndex =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [autoplay, images.length]);

  const handleMouseEnter = () => {
    setAutoplay(false);
  };

  const handleMouseLeave = () => {
    setAutoplay(true);
  };

  const handlePrev = () => {
    setCurrentImage(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImage(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="prev" onClick={handlePrev}>&#10094;</button>
      <img src={images[currentImage]} alt={`Image ${currentImage}`} />
      <button className="next" onClick={handleNext}>&#10095;</button>
    </div>
  );
};

export default Carousel;
