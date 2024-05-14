import React from 'react';

const CarouselRoom = () => {
  return (
    <>
      <div className="swiper-container main-slider loading">
        <div className="swiper-wrapper">
          {/* Your swiper slides */}
        </div>
        <div className="swiper-button-prev swiper-button-white"></div>
        <div className="swiper-button-next swiper-button-white"></div>
      </div>

      {/* Thumbnail navigation */}
      <div className="swiper-container nav-slider loading">
        <div className="swiper-wrapper" role="navigation">
          {/* Your thumbnail swiper slides */}
        </div>
      </div>
    </>
  );
}

export default CarouselRoom;
