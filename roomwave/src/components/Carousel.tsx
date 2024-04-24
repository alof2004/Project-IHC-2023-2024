import { useState } from 'react';

interface Room {
  imagem1: string;
  imagem2: string;
  imagem3: string;
  imagem4: string;
}

function Carousel({ room }: { room: Room }) {
  const [mainImage, setMainImage] = useState(room.imagem1);
  const [otherImages, setOtherImages] = useState([room.imagem2, room.imagem3, room.imagem4]);

  const handleImageClick = (clickedImage: string) => {
    setMainImage(clickedImage);
    setOtherImages([...otherImages.filter(image => image !== clickedImage), mainImage]);
  };

  return (
    <div className="room-images">
      <img src={mainImage} alt="pic1" className="main-image" />
      <div className="other-images">
        {otherImages.map((image, index) => (
          <img
            key={index}
            src={image}
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