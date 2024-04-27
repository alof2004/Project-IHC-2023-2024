import React, { useState } from 'react';
import Slider from '@mui/material/Slider';

interface PriceRangeProps {
 onRangeChange: (newRange: [number, number]) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({ onRangeChange }) => {
 const [range, setRange] = useState<[number, number]>([100, 1500]);

 const handleChanges = (event: Event, newValue: [number, number]) => {
    setRange(newValue);
    onRangeChange(newValue);
 };

 return (
    <div style={{ width: "20rem", padding: "20px", margin: "10px", backgroundColor: "#252525", color: "white", borderRadius: "10px" }}>
      <h3> Filtrar por preço </h3>
      <Slider 
        value={range} 
        onChange={handleChanges} 
        valueLabelDisplay="auto"
        min={100} 
        max={1500} 
        sx={{
          color: 'white', // This changes the color of the slider thumb and track
          '& .MuiSlider-thumb': {
            color: 'white', // Ensures the thumb is white
          },
          '& .MuiSlider-track': {
            color: 'white', // Ensures the track is white
          },
        }}

      />
      Mostrando preços {range[0]} - {range[1]}
    </div>
 );
};

export default PriceRange;
