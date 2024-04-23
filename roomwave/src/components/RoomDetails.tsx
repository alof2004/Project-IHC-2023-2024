import { Link } from 'react-router-dom'; // Assuming you're using React Router
import '../css/RoomDetails.css';
import details from './rooms.json';
import Carousel from './Carousel';


function RoomDetails(){
    const room = details[0]; // Assuming there's only one room in the array

    
    

    return (
        <div >
            <Link to="./LoginBox ">                   
                 <img src='./src/images/return.png' className='return-button' alt="return"/>
            </Link>
            <h1 className='title_info'>
                Quarto de {''} 
                <span className='title_info_proprietaria'>{room.Proprietaria}</span>
                <div className='contact-box'>
                    <img src= "./src/images/telefone_icon.png" width='80 px' height='50px'></img>
                    <span className="phone-number">Telefone: 914439900</span>
                </div>
            </h1>
            <h2 className='description_info'>
                Localização: {''} 
                <span className=''>{room.localizacao}, {room.cidade}</span>
            </h2>
            
            <Carousel room={{ imagem1: './src/images/quarto1.jpg', 
                              imagem2: './src/images/quarto1_2.jpg', 
                              imagem3: './src/images/quarto1_3.jpg', 
                              imagem4: './src/images/quarto1_4.jpg' 
                            }} />
            <div>
                <h2 className='title_info'>Informações sobre o quarto</h2>
                <p className='description_info'> 
                    A habitação dispõem de uma área de {room.area}m2 e é rodeada por um ambiente {room.Ambiente}. Inclui uma {room.servicos.join(", ")} e, o mais importante, uma cama {room.Cama}. <br />
                    Janela {room.Ambiente}. A cozinha é {room.Cozinha}, a casa tem disponiveis {room.casas_de_banho} casas de banho.<br />
                    Na sua proximidade encontra vários edifícios como: {room.Locais_proximos}.
                    Autocarros {room.Transportes}. {room.Descrição_Proprietaria}<br />
                    Pessoas do género {room.Pessoas_permitidas[0]} são permitidas ,bem como {room.Pessoas_permitidas[1]}.Animais são {room.Animais} e o acesso a fumadores é {room.Fumadores}.<br />
                    Os gastos são {room.gastos}<br />
                </p>
            </div>
        </div>
    )
}

export default RoomDetails;