import { Link } from 'react-router-dom'; // Assuming you're using React Router
import '../css/RoomDetails.css';
import details from './rooms.json';
import Example from './slideshow';


function RoomDetails(){
    const nomeProprietaria = details[0].Proprietaria;

    return (
        <div >
            <Link to="./LoginBox ">                   
                 <img src='./src/images/return.png' className='return-button' alt="return"/>
            </Link>
            <h1 className='title_info'>
                Quarto de {''} 
                <span className='title_info_proprietaria'>{nomeProprietaria}</span>
            </h1>
            
        </div>
    )
}

export default RoomDetails;