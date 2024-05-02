import React, { useState } from 'react';
import { Card, Carousel, Row, Col } from 'react-bootstrap';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaAward } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import roomData from './rooms.json';

const RoomSlider = () => {
  const itemsPerPage = 3;
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
      <Carousel className="room-slider-carousel" activeIndex={activePage} onSelect={() => {}}>
        {pages.map((page, index) => (
          <Carousel.Item key={index}>
            <Row>
              {Array.isArray(page) && page.map((room) => (                
                <Col key={room.id} md={4}>
                  <Card className="shadow-lg border-0 position-relative" style={{ width: '700px', height: "1350px", borderRadius: "60px" }}>
                    <div className="room-image-container">
                      <Card.Img className="room-image" style={{ width: "640px", height: "400px", objectFit: "cover" }} variant="top" src={room.imagem1} />
                    </div>
                    <Card.Body className="p-2">
                      <div className="text-center">
                        <h1 style={{ fontSize: "50px" }}>Quarto de {room.Proprietaria}</h1>
                        <div className="text-sm"><strong>Descrição:</strong> {room.description}</div>
                        <div className="text-sm"><strong>Localização:</strong> {room.localizacao}, {room.cidade}, {room.país}</div>
                        <div className="text-sm"><strong>Preço:</strong> <span style={{ color: 'orange' }}>{room.price}€</span></div>
                        <div className="text-sm"><strong>Avaliação:</strong> {renderRatingStars(room.Avaliacao)}</div>
                        <div className="text-sm"><strong>Pessoas permitidas:</strong> {room.Pessoas_permitidas.join(', ')}</div>
                        <div className="text-sm"><strong>Animais permitidos:</strong> {room.Animais}</div>
                        <div className="text-sm"><strong>Gastos incluídos:</strong> {room.gastos === 'incluídas' ? 'Sim' : 'Não'}</div>
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
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-light btn-lg " onClick={handlePrevPage} disabled={activePage === 0}><FiChevronLeft size={50} /></button>
        <span className="mx-3" style={{ fontSize: "30px" }}><strong>Anterior</strong></span>
        <span className="mx-3" style={{ fontSize: "30px" }}><strong>Próxima</strong></span>
        <button className="btn btn-light btn-lg" onClick={handleNextPage} disabled={activePage === pages.length - 1}><FiChevronRight size={50} /></button>
      </div>
    </div>
  );
};

export default RoomSlider;
