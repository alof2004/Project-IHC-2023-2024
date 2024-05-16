import React, { useState } from 'react';
import opinionsData from './opinions.json';
import '../css/RoomsListPage.css';

const Opinions_carrousel = () => {
  const [selectedItemId, setSelectedItemId] = useState(opinionsData[0].id.toString());

  const handleRadioChange = (event: { target: { value: any; }; }) => {
    const newSelectedId = event.target.value;
    setSelectedItemId(newSelectedId);
  };

  return (
    <div className="client_opinions">
      <div id="carousel">
        {opinionsData.map((opinion) => (
          <div key={opinion.id} className={`item ${selectedItemId === opinion.id ? 'active' : ''}`}>
            <h2>{opinion.name}</h2>
            <p>{opinion.país}</p>
            <p>{opinion.comentario}</p>
          </div>
        ))}
      </div>
      <div className='final_botoes'>
        {opinionsData.map((opinion) => (
          <input 
            key={opinion.id} 
            type="radio" 
            name="position" 
            value={opinion.id.toString()} 
            checked={selectedItemId === opinion.id} 
            onChange={handleRadioChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Opinions_carrousel;
