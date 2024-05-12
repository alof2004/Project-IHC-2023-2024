import React from 'react';
import '../css/CarouselFade.css'; // Importando o arquivo CSS


const CarouselFade = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h3 style={{ textAlign: 'center', margin: '55px 0px', borderBottom: '2px solid #666', display: 'inline-block', paddingBottom: '10px' }}>Carousel Fade In & FadeOut</h3>
            <div id="carouselFade" className="carousel slide carousel-fade" data-ride="carousel">
                {/* Wrapper for slides */}
                <div className="carousel-inner" role="listbox">
                    <div className="item active">
                        <div className="carousel-caption">
                            <h3>1ere Image</h3>
                            <p>Voici la (taataataaaa) première image ;p</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="carousel-caption">
                            <h3>Second slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="carousel-caption">
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <a className="left carousel-control" href="#carouselFade" role="button" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#carouselFade" role="button" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    );
};

export default CarouselFade;
