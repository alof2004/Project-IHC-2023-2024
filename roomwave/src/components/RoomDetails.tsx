import { Link } from 'react-router-dom'; // Assuming you're using React Router
import '../css/RoomDetails.css';
import details from './rooms.json';
import Carousel from './Carousel';
import NavBar from './NavBar';
import { SetStateAction, useEffect, useState } from 'react';
import Map from './Map';
import {useParams } from 'react-router-dom'; // Import useNavigate
import { useLocation, useNavigate } from 'react-router-dom';


import Button from './button';
import Footer from './footer';
import TemplateDemo from './Table_location';
import HeartIcon from './HeartIconDetails';


interface Room {
    id: number;
    Proprietaria: string;
    imagem1: string;
    imagem2?: string;
    imagem3?: string;
    imagem4?: string;
    localizacao: string;
    Locais_proximos: string[];
    cidade: string;
    país: string;
    latitude: number;
    longitude: number;
    description: string;
    Transportes: string;
    mobilia: string[];
    Descrição_Proprietaria: string;
    Cama: string;
    Cozinha: string;
    casas_de_banho: number;
    Ambiente: string;
    price: number;
    Pessoas_permitidas: string[];
    gastos: string;
    Animais: string;
    Fumadores: string;
    area: number;
    Vista: string;
    Renda_inclui: string[];
    Equipamento_disponivel: string[];
    Genero: string[];
    TipoQuarto: string;
    WC: string;
    Alojamento: string;
    Andar: string;
    Avaliado: string;
    Avaliacao: number;
    data_entrada: string;
    data_saida: string;
   }


function RoomDetails(){
    const { ID } = useParams();
    const room: Room | undefined = details.find((room) => room.id.toString() === ID);
    const userData = localStorage.getItem('userData');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
    // Save the current path to local storage or session storage
    localStorage.setItem('redirectPath', location.pathname);
    console.log(location.pathname);
    }, [location]);
        
    console.log(ID);
    if (!room) {
        console.log(room)
        return <div>Loading...</div>; // or handle the case when room is not found
    }
    return (
        <div>
        <NavBar />
        <div className='text'>
            <div className='tudo' style={{margin:"30px auto", backgroundColor:"#d6d6d6", width:"100%", maxWidth:"90%", borderRadius:"20px"}}>
            <Link to="/">                   
                 <img src='../../src/images/return.png' className='return-button' alt="return"/>
            </Link>
            <div className='title_info_more_number_proprietaria'> 
                        <div className='title_info_proprietaria'>
                            <h1>
                                Quarto de {''} 
                                <span style={{ color: "#FF7A41" }}>{room?.Proprietaria || ''}</span>
                            </h1>
                            <h2 style={{ marginTop: "30px", fontSize: "30px" }}>
                                Localização: {''} 
                                <span>{room?.localizacao}, {room?.cidade}</span>
                            </h2>
                        </div>
                    {userData ? (
                        <div className='title_info_number'>
                            <img src="../../src/images/telefone_icon.png" width='80px' height='50px' alt="telefone icon" />
                            <span>Telefone: 914439900</span>
                        </div>                    
                        ) : (
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className='title_info_number'>
                            <img src="../../src/images/telefone_icon.png" width='80px' height='50px' alt="telefone icon" />
                            <span>Faça login para contactar o senhorio</span>
                            </div>  
                        </Link>
                        )}

                            <div className='info_contact'>  
                                <Button />
                                <div className="icon_contact" style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                    <div className='heart_icon' style={{ marginRight: '10px' }}>
                                        <HeartIcon roomId={parseInt(ID ?? '')} isFavorite={false} />
                                    </div>
                                    <div className='share_icon' style={{ marginLeft: '10px' }}>
                                        <img src='../../src/images/share.png' alt="share" style={{ width: '100%', height: '100%' }} />
                                    </div>
                                </div>
                            </div>

            </div>
            
            <div >
                <Carousel room={{ imagem1: '../../src/images/quarto1.jpg', 
                                  imagem2: '../../src/images/quarto1_2.jpg', 
                                  imagem3: '../../src/images/quarto1_3.jpg', 
                                  imagem4: '../../src/images/quarto1_4.jpg' 
                                }} />
                <div className='price_info'>
                    <h1>
                        <span style={{ fontSize:"50px",color:"#FF7A41", fontWeight:"bold" }}>
                        Preço por mês:  
                        </span>
                        <span style={{fontSize:"80px"}}>
                             {room?.price}€
                        </span>  + gastos {room?.gastos ?? ''}
                    </h1>
                </div>
            </div>
            <div className='description_info'>
                <h2 style={{fontSize:"50px", marginBottom:"30px"}}>Informações sobre o quarto</h2>
                <p> 
                    A habitação dispõem de uma área de {room.area}m2 e é rodeada por um ambiente {room.Ambiente}. Inclui uma {room.mobilia.join(", ")} e, o mais importante, uma cama {room.Cama}. <br />
                    Janela {room.Ambiente}. A cozinha é {room.Cozinha}, a casa tem disponiveis {room.casas_de_banho} casas de banho.<br />
                    Na sua proximidade encontra vários edifícios como: {room.mobilia.join(", ")}.
                    Autocarros {room.Transportes}. {room.Descrição_Proprietaria}<br />
                    Pessoas do género {room.Pessoas_permitidas[0]} são permitidas ,bem como {room.Pessoas_permitidas[1]}.Animais são {room.Animais} e o acesso a fumadores é {room.Fumadores}.<br />
                    Os gastos são {room.gastos}<br />
                </p>
            </div>

            <div className='description_info'>
                    <h2 className="title_info" style={{ fontSize: "50px", marginBottom: "30px", marginRight: "20px" }}>A Renda inclui:</h2>

                    <div className="boxoptions">
                        <div className="column column-left"> 
                            <ul>
                                {room.Renda_inclui.slice(0, 5).map((Renda_inclui, index) => (
                                    <li key={index}><span className="icon"><img src='../../src/images/plus.png' style={{ width: "35px", height: "35px" }} alt="plus icon" /></span>{Renda_inclui}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="column column-right"> 
                            <ul>
                                {room.Renda_inclui.slice(5, 10).map((Renda_inclui, index) => (
                                    <li key={index}><span className="icon"><img src='../../src/images/plus.png' style={{ width: "35px", height: "35px" }} alt="plus icon" /></span>{Renda_inclui}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='description_info'>
                    <h2 className="title_info" style={{ fontSize: "50px", marginBottom: "30px", marginRight: "20px" }}>Sobre a habitação:</h2>

                    <div className="boxoptions">
                        <div className="column column-left"> 
                            <ul>
                                {room.mobilia.slice(0, 5).map((mobilia, index) => (
                                    <li key={index}><span className="icon"><img src='../../src/images/plus.png' style={{ width: "35px", height: "35px" }} alt="plus icon" /></span>{mobilia}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="column column-right"> 
                            <ul>
                                {room.mobilia.slice(5, 10).map((mobilia, index) => (
                                    <li key={index}><span className="icon"><img src='../../src/images/plus.png' style={{ width: "35px", height: "35px" }} alt="plus icon" /></span>{mobilia}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='description_info'>
                    <h2 className="title_info" style={{ fontSize: "50px", marginBottom: "30px", marginRight: "20px" }}>Equipamentos:</h2>

                    <div className="boxoptions">
                        <div className="column column-left"> 
                            <ul>
                                {room.Equipamento_disponivel.slice(0, 5).map((Equipamento_disponivel, index) => (
                                    <li key={index}><span className="icon"><img src='../../src/images/plus.png' style={{ width: "35px", height: "35px" }} alt="plus icon" /></span>{Equipamento_disponivel}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="column column-right"> 
                            <ul>
                                {room.Equipamento_disponivel.slice(5, 10).map((Equipamento_disponivel, index) => (
                                    <li key={index}><span className="icon"><img src='../../src/images/plus.png' style={{ width: "35px", height: "35px" }} alt="plus icon" /></span>{Equipamento_disponivel}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                
                <div className='mapcontainer'>
                    <h2 style={{marginLeft:"0px", fontSize:"50px", marginBottom:"30px"}}>Localização:</h2>
                    <Map />
                </div>
                </div>
        </div>
        <TemplateDemo />
        <Footer />
    </div>
    )
}

export default RoomDetails;