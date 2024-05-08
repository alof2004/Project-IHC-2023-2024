import { useState } from 'react';

interface Room {
  imagem1: string;
  imagem2: string;
  imagem3: string;
  imagem4: string;
}

function Carousel({ room }: { room: Room | undefined }) {
  // Initialize state with default values
  const [mainImage, setMainImage] = useState<string | undefined>(room?.imagem1);
  const [otherImages, setOtherImages] = useState<(string | undefined)[]>([room?.imagem2, room?.imagem3, room?.imagem4]);

  const handleImageClick = (clickedImage: string | undefined) => {
    if (clickedImage) {
      setMainImage(prevMainImage => clickedImage);
      setOtherImages(prevOtherImages => {
        const newOtherImages = prevOtherImages.filter(image => image!== clickedImage);
        return [...newOtherImages, mainImage];
      });
    }
  };
  const defaultImage = '../../src/images/default.jpg'; // Adjust this path as necessary

  // Filter out undefined images from otherImages array
  const filteredOtherImages = otherImages.filter(image => image!== undefined);

  return (
    <div className="room-images">
      <img src={mainImage || defaultImage} alt="pic1" className="main-image" />
      <div className="other-images">
        {filteredOtherImages.map((image, index) => (
          <img
            key={index}
            src={image || defaultImage}
            alt={`pic${index + 2}`}
            className="vertical-image"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
