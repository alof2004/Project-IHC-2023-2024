import React, { useEffect, useState } from 'react';
import { Card, Carousel, Row, Col } from 'react-bootstrap';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaAward } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import roomData from './rooms.json';
import '../css/cardsClientHome.css'
import { Link } from 'react-router-dom';

const RoomSlider = () => {
  const itemsPerPage = 3;
  const [activePage, setActivePage] = useState(0);
  const [visitedRoomIds, setVisitedRoomIds] = useState<number[]>([]);

  useEffect(() => {
    const visitedRooms = JSON.parse(localStorage.getItem('visitedRooms') || '[]').map((id: any) => Number(id));
    setVisitedRoomIds(visitedRooms);
  }, []);

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
      return <FaAward className="certificate-icon position-absolute" color="#FF7A41" size={120} style={{ top: '10px', right: '10px' }} />;
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
  const pages = splitRoomsIntoPages(roomData.filter(room => visitedRoomIds.includes(room.id)), itemsPerPage);
  if (pages.length === 0) {
    return (<></>);
  }
  else
  return (
    <div className="px-0">
      <h1 style={{ marginLeft: "4%", marginTop: "4%", fontSize: "60px" }}>Quartos vistos recentemente...</h1>
      <div className="room-slider-container">
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-light btn-xl" onClick={handlePrevPage} disabled={activePage === 0}><FiChevronLeft size={100} style={{ backgroundColor: "transparent", border: "none" }} /></button>
          <Carousel style={{ width: "100%" }} className="room-slider-carousel" activeIndex={activePage} onSelect={() => { }}>
            {pages.map((page, index) => (
              <Carousel.Item key={index}>
                <Row>
                  {Array.isArray(page) && page.map((room) => (
                    <Col key={room.id} sm={12} md={4} className="mb-4">
                      <Link to={`/room/${room.id}`} style={{ textDecoration: 'none' }}>
                        <Card className="shadow-lg border-0 position-relative" style={{ borderRadius: "60px", margin:"5px" }}>
                          <div className="room-image-container">
                            <Card.Img className="room-image" style={{ width: "100%", height: "100%", objectFit: "cover" }} variant="top" src={room.imagem1} />
                          </div>
                          <Card.Body className="p-2">
                            <div className="text-center">
                              <h1 style={{ fontSize: "40px" }}>Quarto de {room.Proprietaria}</h1>
                              <div className="text-sm"><strong>Descrição:</strong> {room.description}</div>
                              <div className="text-sm"><strong>Localização:</strong> {room.localizacao}, {room.cidade}, {room.país}</div>
                              <div className="text-sm"><strong>Preço:</strong> <span style={{ color: '#FF7A41' }}>{room.price}€</span></div>
                              <div className="text-sm"><strong>Avaliação:</strong> {renderRatingStars(room.Avaliacao)}</div>
                              <div className="text-sm"><strong>Pessoas permitidas:</strong> {room.Pessoas_permitidas.join(', ')}</div>
                              <div className="text-sm"><strong>Animais permitidos:</strong> {room.Animais}</div>
                              <div className="text-sm"><strong>Gastos incluídos:</strong> {room.gastos === 'incluídas' ? 'Sim' : 'Não'}</div>
                            </div>
                          </Card.Body>
                          {renderCertificationIcon(room.Avaliacao)}
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>

          <button className="btn btn-light btn-xl" onClick={handleNextPage} disabled={activePage === pages.length - 1}><FiChevronRight size={100} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomSlider;
