import React, { useState } from 'react';
import { Card, Carousel, Row, Col } from 'react-bootstrap';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaAward } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Importando ícones de seta do React Icons
import roomData from './rooms.json';

const RoomSlider = () => {
  const itemsPerPage = 3; // Número de quartos por página
  const [activePage, setActivePage] = useState(0);

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={i} color="#ffc107" />);
    }
    if (hasHalfStar) {
      stars.push(<AiFillStar key="half" color="#ffc107" />);
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<AiOutlineStar key={`empty-${i}`} color="#ced4da" />);
    }
    return stars;
  };

  const renderCertificationIcon = (rating: number) => {
    if (rating > 0) {
      return <FaAward className="certificate-icon position-absolute" color="#28a745" size={120} style={{ top: '10px', right: '10px' }} />;
    }
    return null;
  };

  // Função para dividir os quartos em páginas
  const splitRoomsIntoPages = (data: string | any[], itemsPerPage: number) => {
    const pages = [];
    for (let i = 0; i < data.length; i += itemsPerPage) {
      pages.push(data.slice(i, i + itemsPerPage));
    }
    return pages;
  };

  const handleNextPage = () => {
    setActivePage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setActivePage((prevPage) => prevPage - 1);
  };

  const pages = splitRoomsIntoPages(roomData, itemsPerPage);

  return (
    <div className="px-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span>
          <button className="btn btn-light btn-lg" onClick={handlePrevPage} disabled={activePage === 0}><FiChevronLeft size={50} /></button>
          <span className="mx-3" style={{fontSize:"30px"}}><strong>Anterior</strong></span>
        </span>
        <span>
          <span className="mx-3"  style={{fontSize:"30px"}} ><strong>Próxima</strong></span>
          <button className="btn btn-light btn-lg" onClick={handleNextPage} disabled={activePage === pages.length - 1}><FiChevronRight size={50} /></button>
        </span>
      </div>
      <Carousel className="room-slider-carousel" activeIndex={activePage} onSelect={() => {}}>
        {pages.map((page, index) => (
          <Carousel.Item key={index}>
            <Row>
              {Array.isArray(page) && page.map((room) => (
                <Col key={room.id} md={4}>
                  <Card className="shadow-lg border-0 position-relative" style={{ width: '1000px', height: "1250px", borderRadius: "60px" }}>
                    <div className="room-image-container">
                      <Card.Img className="room-image" style={{ width: "930px", height: "500px", objectFit: "cover" }} variant="top" src={room.imagem1} />
                    </div>
                    <Card.Body className="p-2">
                      <Card.Title className="text-center mb-2"><h1 style={{ fontSize: "60px" }}>Quarto de {room.Proprietaria}</h1></Card.Title>
                      <div className="text-center" style={{ fontSize: "40px" }}>
                        <p className="text-sm"><strong>Descrição:</strong> {room.description}</p>
                        <p className="text-sm"><strong>Localização:</strong> {room.localizacao}, {room.cidade}, {room.país}</p>
                        <p className="text-sm"><strong>Preço:</strong> <span style={{ color: 'orange' }}>{room.price}€</span></p>
                        <p className="text-sm"><strong>Avaliação:</strong> {renderRatingStars(room.Avaliacao)}</p>
                        <p className="text-sm"><strong>Pessoas permitidas:</strong> {room.Pessoas_permitidas.join(', ')}</p>
                        <p className="text-sm"><strong>Animais permitidos:</strong> {room.Animais}</p>
                        <p className="text-sm"><strong>Gastos incluídos:</strong> {room.gastos === 'incluídas' ? 'Sim' : 'Não'}</p>
                      </div>
                    </Card.Body>
                    {renderCertificationIcon(room.Avaliacao)}
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default RoomSlider;
