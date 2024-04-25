import { Link } from 'react-router-dom'; // Assuming you're using React Router
import '../css/RoomDetails.css';
import details from './rooms.json';
import Carousel from './Carousel';
import NavBar from './NavBar';
import { useState } from 'react';


function RoomDetails(){
    const room = details[0]; // Assuming there's only one room in the array
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoritesClick = () => {
        setIsFavorite(!isFavorite); // Alternar entre true e false
    };

    return (
        <div >
            <NavBar />
            <Link to="./home">                   
                 <img src='./src/images/return.png' className='return-button' alt="return"/>
            </Link>
            <div className='title_info_more_number_proprietaria'> 
                    <div className='title_info_proprietaria'>
                        <h1>
                            Quarto de {''} 
                            <span style={{color:"#ffa500"}}>{room.Proprietaria}</span>
                        </h1>
                    </div>
                    <div className=' title_info_number' >
                        <img src= "./src/images/telefone_icon.png" width='60 px' height='40px'></img>
                        <span>Telefone: 914439900</span>
                    </div>
                    <div className='info_contact'>   
                      <div>
                        <h1>Contactar</h1>
                      </div>
                      <div className='info_contact_second'>
                        <div onClick={handleFavoritesClick} style={{ cursor: 'pointer' }}>
                            <div>
                                <img src={isFavorite ? './src/images/favorites2.png' : './src/images/favorites1.png'} alt="favorites"  />
                            </div>
                        </div>
                        <div>
                            <img src='./src/images/share.png' alt="share" />
                        </div>
                    </div>
                    </div>
            </div>
            <h2 style={{marginLeft:"80px", fontSize:"30px"}}>
                Localização: {''} 
                <span className=''>{room.localizacao}, {room.cidade}</span>
            </h2>
            
            <Carousel room={{ imagem1: './src/images/quarto1.jpg', 
                              imagem2: './src/images/quarto1_2.jpg', 
                              imagem3: './src/images/quarto1_3.jpg', 
                              imagem4: './src/images/quarto1_4.jpg' 
                            }} />
            <div className='description_info'>
                <h2 style={{fontSize:"50px", marginBottom:"30px"}}>Informações sobre o quarto</h2>
                <p> 
                    A habitação dispõem de uma área de {room.area}m2 e é rodeada por um ambiente {room.Ambiente}. Inclui uma {room.servicos.join(", ")} e, o mais importante, uma cama {room.Cama}. <br />
                    Janela {room.Ambiente}. A cozinha é {room.Cozinha}, a casa tem disponiveis {room.casas_de_banho} casas de banho.<br />
                    Na sua proximidade encontra vários edifícios como: {room.Locais_proximos}.
                    Autocarros {room.Transportes}. {room.Descrição_Proprietaria}<br />
                    Pessoas do género {room.Pessoas_permitidas[0]} são permitidas ,bem como {room.Pessoas_permitidas[1]}.Animais são {room.Animais} e o acesso a fumadores é {room.Fumadores}.<br />
                    Os gastos são {room.gastos}<br />
                </p>
            </div>

            <div className='description_info'>
                <h2 style={{fontSize:"50px", marginBottom:"30px"}}>Renda inclui:</h2>
            
                    <div className="container">
                        <div className="column">
                        <ul>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[0]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[1]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[2]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[3]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[4]}</li>
                        </ul>
                        </div>
                        <div className="column">
                        <ul>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[5]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[6]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[7]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[8]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[9]}</li>
                        </ul>
                        </div>
                    </div>
                </div>
                <div className='description_info'>
                <h2 style={{fontSize:"50px", marginBottom:"30px"}}>Sobre habitação:</h2>
            
                    <div className="container">
                        <div className="column">
                        <ul>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[0]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[1]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[2]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[3]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[4]}</li>
                        </ul>
                        </div>
                        <div className="column">
                        <ul>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[5]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[6]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[7]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[8]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[9]}</li>
                        </ul>
                        </div>
                    </div>
                </div>
                <div className='description_info'>
                <h2 style={{fontSize:"50px", marginBottom:"30px"}}>Equipamentos disponiveisS:</h2>
            
                    <div className="container">
                        <div className="column">
                        <ul>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[0]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[1]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[2]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[3]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[4]}</li>
                        </ul>
                        </div>
                        <div className="column">
                        <ul>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[5]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[6]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[7]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[8]}</li>
                            <li><span className="icon"><img src='./src/images/plus.png' style={{width:"35px", height:"35px"}}/></span>{room.Renda_inclui[9]}</li>
                        </ul>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default RoomDetails;