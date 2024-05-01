import { Link } from 'react-router-dom'; // Assuming you're using React Router
import '../css/RoomDetails.css';
import details from './rooms.json';
import Carousel from './Carousel';
import NavBar from './NavBar';
import { useState } from 'react';
import Map from './Map';
import Button from './button';
import Footer from './footer';
import TemplateDemo from './Table_location';




function RoomDetails(){
    const room = details[0]; // Assuming there's only one room in the array
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoritesClick = () => {
        setIsFavorite(!isFavorite); // Alternar entre true e false
    };

    return (
        <div>
        <NavBar />
        <div className='text'>
            <Link to="/">                   
                 <img src='./src/images/return.png' className='return-button' alt="return"/>
            </Link>
            <div className='title_info_more_number_proprietaria'> 
                    <div className='title_info_proprietaria'>
                        <h1>
                            Quarto de {''} 
                            <span style={{color:"#ffa500"}}>{room.Proprietaria}</span>
                            <h2 style={{marginTop:"30px",flexDirection:"column",fontSize:"30px"}}>
                                Localização: {''} 
                                <span>{room.localizacao}, {room.cidade}</span>
                            </h2>
                        </h1>
                    </div>
                    <div className=' title_info_number' >
                        <img src= "./src/images/telefone_icon.png" width='80 px' height='50px'></img>
                        <span>Telefone: 914439900</span>
                    </div>
                    <div className='info_contact'>   
                      
                      <div className='info_contact_second'>
                        <Button />
                        <div className="icon_contact" onClick={handleFavoritesClick} style={{ cursor: 'pointer' }}>
                            <div className='heart_icon'>
                                <img src={isFavorite ? './src/images/favorites2.png' : './src/images/favorites1.png'} alt="favorites"  />
                            </div>
                            <div className='share_icon'>
                                <img src='./src/images/share.png' alt="share" />
                            </div>
                        </div>
                      </div>
                    </div>
            </div>
            
            <div >
                <Carousel room={{ imagem1: './src/images/quarto1.jpg', 
                                  imagem2: './src/images/quarto1_2.jpg', 
                                  imagem3: './src/images/quarto1_3.jpg', 
                                  imagem4: './src/images/quarto1_4.jpg' 
                                }} />
                <div className='price_info'>
                <h1>
                    <span style={{ fontSize:"50px",color:"orange" }}>
                    Preço por mês:  
                    </span>
                    <span style={{fontSize:"80px"}}>
                         {room.price}€
                    </span>  + gastos {room.gastos}
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
                                    <li key={index}><span className="icon"><img src='./src/images/plus.png' style={{ width: "35px", height: "35px" }} alt="plus icon" /></span>{Renda_inclui}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="column column-right"> 
                            <ul>
                                {room.Renda_inclui.slice(5, 10).map((Renda_inclui, index) => (
                                    <li key={index}><span className="icon"><img src='./src/images/plus.png' style={{ width: "35px", height: "35px" }} alt="plus icon" /></span>{Renda_inclui}</li>
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
                                    <li key={index}><span className="icon"><img src='./src/images/plus.png' style={{ width: "35px", height: "35px" }} alt="plus icon" /></span>{mobilia}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="column column-right"> 
                            <ul>
                                {room.mobilia.slice(5, 10).map((mobilia, index) => (
                                    <li key={index}><span className="icon"><img src='./src/images/plus.png' style={{ width: "35px", height: "35px" }} alt="plus icon" /></span>{mobilia}</li>
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
                                    <li key={index}><span className="icon"><img src='./src/images/plus.png' style={{ width: "35px", height: "35px" }} alt="plus icon" /></span>{Equipamento_disponivel}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="column column-right"> 
                            <ul>
                                {room.Equipamento_disponivel.slice(5, 10).map((Equipamento_disponivel, index) => (
                                    <li key={index}><span className="icon"><img src='./src/images/plus.png' style={{ width: "35px", height: "35px" }} alt="plus icon" /></span>{Equipamento_disponivel}</li>
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
        <TemplateDemo />
        <Footer />
    </div>
    )
}

export default RoomDetails;