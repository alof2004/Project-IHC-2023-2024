import { Link } from 'react-router-dom'; // Assuming you're using React Router
import '../css/RoomDetails.css';
import details from './rooms.json';


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
                    <span className="phone-number">914439900</span>
                </div>
            </h1>
            
            <div className="room-images">
                <img src={room.imagem1} alt="pic1" className="main-image" />
                <div className="other-images">
                    <img src={room.imagem2} alt="pic2" className="vertical-image" />
                    <img src={room.imagem3} alt="pic3" className="vertical-image" />
                    <img src={room.imagem4} alt="pic4" className="vertical-image" />
                </div>
            </div>
        </div>
    )
}

export default RoomDetails;