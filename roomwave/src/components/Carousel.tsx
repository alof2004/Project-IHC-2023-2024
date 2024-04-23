import { useState } from 'react';
interface Room {
  imagem1: string;
  imagem2: string;
  imagem3: string;
  imagem4: string;
}

function Carousel({ room }: { room: Room }) {

  // Estado para controlar a imagem principal e as outras imagens
  const [mainImage, setMainImage] = useState(room.imagem1);
  const [otherImages, setOtherImages] = useState([room.imagem2, room.imagem3, room.imagem4]);

  // Função para lidar com o clique em uma imagem secundária
  const handleImageClick = (clickedImage: any) => {
    // Define a imagem clicada como a nova imagem principal
    setMainImage(clickedImage);
    // Remove a imagem clicada da lista de outras imagens e adiciona a imagem principal anterior ao final da lista
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
